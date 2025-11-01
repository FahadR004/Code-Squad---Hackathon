const express = require('express');
const router = express.Router();
const {
  createReview,
  getFarmerReviews,
  getMyReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/farmer/:farmerId', getFarmerReviews);

// Protected routes - Buyer only
router.post('/', protect, authorize('buyer'), createReview);
router.get('/my-reviews', protect, authorize('buyer'), getMyReviews);
router.put('/:id', protect, authorize('buyer'), updateReview);
router.delete('/:id', protect, authorize('buyer'), deleteReview);

module.exports = router;