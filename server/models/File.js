const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  size: { type: Number, required: true },
  downloadCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);

