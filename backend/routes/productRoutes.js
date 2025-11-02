const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/productControllers');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllProducts);

// Protected routes - Farmer only (MUST come before /:id)
router.post('/', protect, authorize('farmer'), createProduct);
router.get('/my-products', protect, authorize('farmer'), getMyProducts);  // MOVED UP & CHANGED
router.put('/:id', protect, authorize('farmer'), updateProduct);
router.delete('/:id', protect, authorize('farmer'), deleteProduct);

// Parameterized routes (MUST come last)
router.get('/:id', getProductById);

module.exports = router;