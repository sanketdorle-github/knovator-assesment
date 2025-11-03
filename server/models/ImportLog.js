import mongoose from 'mongoose';

const importLogSchema = new mongoose.Schema({
  log_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sourceUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  totalFetched: {
    type: Number,
    required: true
  },
  newJobs: {
    type: Number,
    required: true
  },
  updatedJobs: {
    type: Number,
    default: 0
  },
  failedJobs: {
    type: Number,
    default: 0
  },
  failedReasons: [{
    type: String
  }],
  completed_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
importLogSchema.index({ timestamp: -1 });
importLogSchema.index({ log_id: 1 });

export default mongoose.model('ImportLog', importLogSchema, 'import_logs');