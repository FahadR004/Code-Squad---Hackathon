const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (Buyer only)
exports.createOrder = async (req, res) => {
  try {
    const { farmerId, items, deliveryAddress, deliveryPhone, paymentMethod, buyerNotes } = req.body;

    // Validation
    if (!farmerId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Farmer ID and order items are required' });
    }

    if (!deliveryAddress || !deliveryPhone) {
      return res.status(400).json({ message: 'Delivery address and phone are required' });
    }

    // Verify all products exist and have sufficient quantity
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.status !== 'active') {
        return res.status(400).json({ message: `Product ${product.name} is not available` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient quantity for ${product.name}. Available: ${product.quantity}` 
        });
      }

      // Verify product belongs to the specified farmer
      if (product.farmerId.toString() !== farmerId) {
        return res.status(400).json({ 
          message: `Product ${product.name} does not belong to this farmer` 
        });
      }

      const subtotal = product.price.amount * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });

      // Reduce product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create order
    const order = new Order({
      buyerId: req.user._id,
      farmerId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      deliveryPhone,
      paymentMethod: paymentMethod || 'cash_on_delivery',
      buyerNotes
    });

    await order.save();

    // Populate for response
    await order.populate('buyerId', 'name email phone_no');
    await order.populate('farmerId', 'name email phone_no');
    await order.populate('items.productId', 'name images');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// @desc    Get all orders for buyer
// @route   GET /api/orders/my-orders
// @access  Private (Buyer only)
exports.getMyOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { buyerId: req.user._id };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('farmerId', 'name email phone_no rating')
      .populate('items.productId', 'name images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      orders
    });
  } catch (err) {
    console.error('Get buyer orders error:', err);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// @desc    Get all orders for farmer
// @route   GET /api/orders/farmer-orders
// @access  Private (Farmer only)
exports.getFarmerOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { farmerId: req.user._id };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('buyerId', 'name email phone_no')
      .populate('items.productId', 'name images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      orders
    });
  } catch (err) {
    console.error('Get farmer orders error:', err);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private (Buyer or Farmer of the order)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyerId', 'name email phone_no address')
      .populate('farmerId', 'name email phone_no address rating')
      .populate('items.productId', 'name images category');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is buyer or farmer of this order
    const isBuyer = order.buyerId._id.toString() === req.user._id.toString();
    const isFarmer = order.farmerId._id.toString() === req.user._id.toString();

    if (!isBuyer && !isFarmer) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    console.error('Get order error:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error while fetching order' });
  }
};

// @desc    Update order status (Farmer only)
// @route   PUT /api/orders/:id/status
// @access  Private (Farmer only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, farmerNotes } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is the farmer of this order
    if (order.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    // Update status and timestamps
    order.status = status;
    if (farmerNotes) order.farmerNotes = farmerNotes;

    if (status === 'confirmed' && !order.confirmedAt) {
      order.confirmedAt = Date.now();
    }
    if (status === 'shipped' && !order.shippedAt) {
      order.shippedAt = Date.now();
    }
    if (status === 'delivered' && !order.deliveredAt) {
      order.deliveredAt = Date.now();
    }
    if (status === 'cancelled' && !order.cancelledAt) {
      order.cancelledAt = Date.now();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ message: 'Server error while updating order' });
  }
};

// @desc    Cancel order (Buyer only - if not confirmed yet)
// @route   PUT /api/orders/:id/cancel
// @access  Private (Buyer only)
exports.cancelOrder = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is the buyer of this order
    if (order.buyerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    // Can only cancel if order is pending
    if (order.status !== 'pending') {
      return res.status(400).json({ 
        message: `Cannot cancel order with status: ${order.status}` 
      });
    }

    // Restore product quantities
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    order.status = 'cancelled';
    order.cancelledAt = Date.now();
    if (cancellationReason) order.cancellationReason = cancellationReason;

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (err) {
    console.error('Cancel order error:', err);
    res.status(500).json({ message: 'Server error while cancelling order' });
  }
};

// @desc    Get order statistics (for farmer dashboard)
// @route   GET /api/orders/stats
// @access  Private (Farmer only)
exports.getOrderStats = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const stats = await Order.aggregate([
      { $match: { farmerId: farmerId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments({ farmerId });
    const totalRevenue = await Order.aggregate([
      { $match: { farmerId: farmerId, status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalOrders,
        revenue: totalRevenue[0]?.total || 0,
        byStatus: stats
      }
    });
  } catch (err) {
    console.error('Get order stats error:', err);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
};