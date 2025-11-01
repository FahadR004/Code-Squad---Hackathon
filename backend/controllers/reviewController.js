const Review = require('../models/Review');
const User = require('../models/User');
const Order = require('../models/Order');

// @desc    Create a review for a farmer
// @route   POST /api/reviews
// @access  Private (Buyer only)
exports.createReview = async (req, res) => {
  try {
    const { farmerId, orderId, productId, rating, comment } = req.body;

    // Validation
    if (!farmerId || !orderId || !productId || !rating) {
      return res.status(400).json({ message: 'Farmer ID, Order ID, Product ID, and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if order exists and belongs to the buyer
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.buyerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only review your own orders' });
    }

    // Check if review already exists for this order
    const existingReview = await Review.findOne({ orderId, buyerId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this order' });
    }

    // Create review
    const review = new Review({
      farmerId,
      buyerId: req.user._id,
      orderId,
      productId,
      rating,
      comment
    });

    await review.save();

    // Update farmer's rating
    const farmer = await User.findById(farmerId);
    if (farmer && farmer.role === 'farmer') {
      await farmer.updateRating(rating);
    }

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review
    });
  } catch (err) {
    console.error('Create review error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this order' });
    }
    res.status(500).json({ message: 'Server error while creating review' });
  }
};

// @desc    Get reviews for a farmer
// @route   GET /api/reviews/farmer/:farmerId
// @access  Public
exports.getFarmerReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ farmerId: req.params.farmerId })
      .populate('buyerId', 'name')
      .populate('productId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Review.countDocuments({ farmerId: req.params.farmerId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      reviews
    });
  } catch (err) {
    console.error('Get farmer reviews error:', err);
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
};

// @desc    Get buyer's reviews
// @route   GET /api/reviews/my-reviews
// @access  Private (Buyer only)
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ buyerId: req.user._id })
      .populate('farmerId', 'name')
      .populate('productId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (err) {
    console.error('Get my reviews error:', err);
    res.status(500).json({ message: 'Server error while fetching your reviews' });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (Buyer only - own reviews)
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is the owner of the review
    if (review.buyerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    // Calculate rating difference
    const oldRating = review.rating;
    const newRating = rating || review.rating;

    // Update review
    review.rating = newRating;
    if (comment !== undefined) review.comment = comment;
    await review.save();

    // Update farmer's rating if rating changed
    if (oldRating !== newRating) {
      const farmer = await User.findById(review.farmerId);
      if (farmer && farmer.role === 'farmer') {
        // Recalculate: remove old rating, add new rating
        const totalRating = (farmer.rating.average * farmer.rating.count) - oldRating + newRating;
        farmer.rating.average = totalRating / farmer.rating.count;
        await farmer.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      review
    });
  } catch (err) {
    console.error('Update review error:', err);
    res.status(500).json({ message: 'Server error while updating review' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Buyer only - own reviews)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is the owner of the review
    if (review.buyerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    // Update farmer's rating before deleting
    const farmer = await User.findById(review.farmerId);
    if (farmer && farmer.role === 'farmer' && farmer.rating.count > 0) {
      const totalRating = (farmer.rating.average * farmer.rating.count) - review.rating;
      farmer.rating.count -= 1;
      farmer.rating.average = farmer.rating.count > 0 ? totalRating / farmer.rating.count : 0;
      await farmer.save();
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (err) {
    console.error('Delete review error:', err);
    res.status(500).json({ message: 'Server error while deleting review' });
  }
};