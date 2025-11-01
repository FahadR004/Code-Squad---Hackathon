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
router.get('/:id', getProductById);

// Protected routes - Farmer only
router.post('/', protect, authorize('farmer'), createProduct);
router.get('/farmer/my-products', protect, authorize('farmer'), getMyProducts);
router.put('/:id', protect, authorize('farmer'), updateProduct);
router.delete('/:id', protect, authorize('farmer'), deleteProduct);

module.exports = router;