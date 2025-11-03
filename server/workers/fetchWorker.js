import axios from "axios";
import { parseStringPromise } from "xml2js";
import { Worker, Queue } from "bullmq";
import cron from "node-cron";
import { CONFIG } from "./config.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
// console.log(process.env.MONGO_URI);
const connection = { url: process.env.REDIS_URL };

// Create separate queues for fetching feeds and processing XML jobs
const fetchQueue = new Queue("fetchFeeds", { connection });
const jobQueue = new Queue("xmlJobs", { connection });

/**
 * Utility function to clean and normalize text content.
 * Removes HTML tags, encoded characters, and extra whitespace.
 */
const cleanText = (text = "") =>
  text
    ?.replace(/<[^>]*>/g, "")
    ?.replace(/&[^;]+;/g, " ")
    ?.replace(/\s+/g, " ")
    ?.trim();

/**
 * Fetches and parses a single XML feed.
 * Converts XML data to JSON, extracts job listings, and adds them to the job queue.
 */
async function processFeed(url) {
  try {
    console.log(`[Fetcher] Fetching XML from ${url}`);
    const { data: xml } = await axios.get(url);
    const jsonData = await parseStringPromise(xml, { explicitArray: false });

    // Attempt to locate job listing entries from common XML structures
    const items =
      jsonData?.rss?.channel?.item ||
      jsonData?.feed?.entry ||
      jsonData?.root?.item ||
      [];

    const arr = Array.isArray(items) ? items : [items];
    if (!arr.length) {
      console.log(`[Fetcher] No items found in ${url}`);
      return;
    }

    // Add parsed job data to the XML job queue for further processing
    await Promise.all(
      arr.map((item, index) =>
        jobQueue.add("xmlJob", {
          job_id: cleanText(item?.id || item?.guid || `${Date.now()}-${index}`),
          title: cleanText(item?.title),
          description: cleanText(item?.description || item["content:encoded"]),
          location: cleanText(item["job_listing:location"]),
          company: cleanText(item["job_listing:company"]),
          type: cleanText(item["job_listing:job_type"]),
          sourceUrl: url,
        })
      )
    );

    console.log(`[Fetcher] Added ${arr.length} jobs from ${url}`);
  } catch (err) {
    console.error(`[Fetcher] Error processing ${url}: ${err.message}`);
  }
}

/**
 * Iterates through all configured feed URLs and processes each one sequentially.
 */
async function fetchAllFeeds() {
  console.log("[Fetcher] Starting feed fetch cycle...");
  for (const url of CONFIG.API_URLS) {
    await processFeed(url);
  }
  console.log("[Fetcher] Feed fetch cycle completed.");
}

/**
 * BullMQ worker responsible for running feed-fetching jobs.
 * Each job triggers the full fetch cycle.
 */
const fetchWorker = new Worker(
  "fetchFeeds",
  async (job) => {
    console.log(`[Worker] Executing fetch job: ${job.id}`);
    await fetchAllFeeds();
    return { status: "feeds_fetched" };
  },
  { connection, concurrency: CONFIG.CONCURRENCY }
);

/**
 * Schedules the fetchFeeds job to run every hour using a cron job.
 */
cron.schedule("0 * * * *", async () => {
  console.log("[CRON] Scheduling hourly fetchFeeds job...");
  await fetchQueue.add("fetchFeeds", {});
});

/**
 * Executes an initial run immediately when the service starts.
 */
await fetchAllFeeds();
console.log("[System] XML Feed Worker initialized and scheduled (hourly).");
