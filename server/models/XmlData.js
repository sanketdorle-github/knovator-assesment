import mongoose from "mongoose";

const xmlDataSchema = new mongoose.Schema(
  {
    job_id: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      index: true,
    },
    sourceUrl: {
      type: String,
      required: true,
    },
    imported_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for better search performance
xmlDataSchema.index({ title: "text", description: "text" });
xmlDataSchema.index({ company: 1, location: 1 });
xmlDataSchema.index({ type: 1, location: 1 });

export default mongoose.model("XmlData", xmlDataSchema, "xml_data");
