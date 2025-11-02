import { Worker } from "bullmq";
import { MongoClient, ObjectId } from "mongodb";
import { CONFIG } from "./config.js";
import dotenv from "dotenv";
dotenv.config();



const connection = { url: process.env.REDIS_URL };

// The name of the BullMQ queue that holds parsed XML job data
const XML_QUEUE_NAME = CONFIG.XML_QUEUE_NAME;

// ====== CONNECT TO MONGODB ======
const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db();
const jobsCollection = db.collection("xml_data");
const logsCollection = db.collection("import_logs");

console.log("[Worker2] Connected to MongoDB and Redis successfully.");

const feedStats = {}; // Keeps per-feed import statistics in memory

// ====== WORKER: PROCESS XML JOBS ======
const jobWorker = new Worker(
  XML_QUEUE_NAME,
  async (job) => {
    const jobData = job.data || {};
    const sourceUrl = jobData.sourceUrl || "unknown_source";

    // Initialize tracking document for this feed source if not already created
    if (!feedStats[sourceUrl]) {
      const logDoc = {
        log_id: new ObjectId(),
        sourceUrl,
        fileName: sourceUrl.split("/").pop(),
        timestamp: new Date(),
        totalFetched: 0,
        newJobs: 0,
        updatedJobs: 0,
        failedJobs: 0,
        failedReasons: [],
      };

      feedStats[sourceUrl] = logDoc;
      await logsCollection.insertOne(logDoc);
      console.log(`[Worker2] Created new import log for source: ${sourceUrl}`);
    }

    const stats = feedStats[sourceUrl];
    stats.totalFetched++;

    // Validate that essential fields are present
    const { job_id, title, description, location, type, company } = jobData;
    if (!job_id || !title) {
      stats.failedJobs++;
      stats.failedReasons.push("Missing job_id or title");
      return;
    }

    try {
      // Check if this job already exists in the database
      const existing = await jobsCollection.findOne({ job_id });

      if (!existing) {
        // Insert a new record if not found
        await jobsCollection.insertOne({
          job_id,
          title,
          description,
          location,
          type,
          company,
          sourceUrl,
          imported_at: new Date(),
        });
        stats.newJobs++;
      } else {
        // Determine if any field has changed since last import
        const changed = ["title", "description", "location", "type", "company"].some(
          (key) => jobData[key] !== existing[key]
        );

        if (changed) {
          // Update the existing record if data differs
          await jobsCollection.updateOne(
            { _id: existing._id },
            { $set: { ...jobData, updated_at: new Date() } }
          );
          stats.updatedJobs++;
        }
      }
    } catch (err) {
      stats.failedJobs++;
      stats.failedReasons.push(err.message);
      console.error(`[Worker2] Error processing job: ${err.message}`);
    }

    // Update log entry in MongoDB after each processed job
    await logsCollection.updateOne(
      { log_id: stats.log_id },
      {
        $set: {
          totalFetched: stats.totalFetched,
          newJobs: stats.newJobs,
          updatedJobs: stats.updatedJobs,
          failedJobs: stats.failedJobs,
          failedReasons: stats.failedReasons,
        },
      }
    );
  },
  { connection }
);

// ====== EVENT LISTENERS ======
jobWorker.on("completed", (job) => {
  console.log(`[Worker2] Completed processing job ID: ${job.id}`);
});

jobWorker.on("failed", (job, err) => {
  console.error(`[Worker2] Job failed. ID: ${job.id} | Error: ${err.message}`);
});

jobWorker.on("drained", async () => {
  console.log("[Worker2] All jobs processed. Finalizing import logs...");
  for (const url in feedStats) {
    const stats = feedStats[url];
    await logsCollection.updateOne(
      { log_id: stats.log_id },
      { $set: { completed_at: new Date() } }
    );
    console.log(`[Worker2] Import log finalized for source: ${url}`);
  }
});

// ====== CLEAN SHUTDOWN HANDLING ======
process.on("SIGINT", async () => {
  console.log("\n[Worker2] Initiating graceful shutdown...");
  await jobWorker.close();
  await mongoClient.close();
  console.log("[Worker2] All connections closed. Exiting process.");
  process.exit(0);
});
