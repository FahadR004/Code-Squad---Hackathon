const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getFarmerOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// Buyer routes
router.post('/', protect, authorize('buyer'), createOrder);
router.get('/my-orders', protect, authorize('buyer'), getMyOrders);
router.put('/:id/cancel', protect, authorize('buyer'), cancelOrder);

// Farmer routes
router.get('/farmer-orders', protect, authorize('farmer'), getFarmerOrders);
router.put('/:id/status', protect, authorize('farmer'), updateOrderStatus);
router.get('/stats', protect, authorize('farmer'), getOrderStats);

// Both buyer and farmer can view order details
router.get('/:id', protect, getOrderById);

module.exports = router;