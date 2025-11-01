const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  phone_no: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  role: {
    type: String,
    enum: ['farmer', 'buyer'],
    required: [true, 'Role is required'],
    default: 'farmer'
  },
  // Rating system for farmers
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  // Profile picture
  profileImage: {
    type: String,
    default: ''
  },
  // Additional fields
  isVerified: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Method to update farmer rating
userSchema.methods.updateRating = function(newRating) {
  if (this.role !== 'farmer') {
    throw new Error('Only farmers can have ratings');
  }
  
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  
  return this.save();
};

module.exports = mongoose.model('User', userSchema);