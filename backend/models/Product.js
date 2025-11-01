const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  images: [String],
  price: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true },
    currency: { type: String, default: 'PKR' }
  },
  quantity: { type: Number, required: true },
  availableFrom: { type: Date, default: Date.now },
  availableUntil: Date,
  harvestDate: Date,
  qualityGrade: String,
  organicCertified: { type: Boolean, default: false },
  status: { type: String, default: 'active' },
  tags: [String]
}, {
  timestamps: true // Auto-adds createdAt and updatedAt
});

module.exports = mongoose.model('Product', productSchema);