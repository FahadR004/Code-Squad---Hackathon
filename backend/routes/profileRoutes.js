const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  getPublicProfile
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

// Public route - view farmer profile
router.get('/user/:userId', getPublicProfile);

// Protected routes - own profile
router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.put('/password', protect, changePassword);

module.exports = router;