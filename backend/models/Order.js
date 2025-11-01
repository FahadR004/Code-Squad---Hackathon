const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  deliveryAddress: {
    street: String,
    city: String,
    province: String
  },
  payment: {
    method: { type: String, default: 'cash' },
    status: { type: String, default: 'pending' },
    transactionId: String
  },
  deliveryDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);