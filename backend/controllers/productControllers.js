const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Farmer only)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      images,
      price,
      quantity,
      availableFrom,
      availableUntil,
      harvestDate,
      qualityGrade,
      organicCertified,
      tags
    } = req.body;

    // Validation
    if (!name || !category || !price?.amount || !price?.unit || !quantity) {
      return res.status(400).json({ message: 'Name, category, price, and quantity are required' });
    }

    // Create product with farmerId from authenticated user
    const product = new Product({
      farmerId: req.user._id,
      name,
      description,
      category,
      images,
      price,
      quantity,
      availableFrom,
      availableUntil,
      harvestDate,
      qualityGrade,
      organicCertified,
      tags
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};

// @desc    Get all products (with filters)
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      organicCertified,
      status,
      search,
      farmerId,
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (organicCertified !== undefined) filter.organicCertified = organicCertified === 'true';
    if (farmerId) filter.farmerId = farmerId;

    // Price range filter
    if (minPrice || maxPrice) {
      filter['price.amount'] = {};
      if (minPrice) filter['price.amount'].$gte = Number(minPrice);
      if (maxPrice) filter['price.amount'].$lte = Number(maxPrice);
    }

    // Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate('farmerId', 'name email phone_no address')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('farmerId', 'name email phone_no address');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    console.error('Get product error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Farmer only - own products)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the owner of the product
    if (product.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Farmer only - own products)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the owner of the product
    if (product.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};

// @desc    Get products by logged-in farmer
// @route   GET /api/products/my-products
// @access  Private (Farmer only)
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    console.error('Get my products error:', err);
    res.status(500).json({ message: 'Server error while fetching your products' });
  }
};