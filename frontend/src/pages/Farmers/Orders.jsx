import React, { useState, useEffect } from 'react';

export default function OrdersPage() {
  const initialStock = {
    Apple: 10,
    Milk: 15,
    Tomatoes: 8,
    Bread: 12,
    Eggs: 20,
    Cheese: 5,
    // Add more as needed
  };

  const initialOrders = [
    { id: 1, product: 'Apple', quantity: 5, status: 'Pending' },
    { id: 2, product: 'Milk', quantity: 5, status: 'Pending' },
    { id: 3, product: 'Tomatoes', quantity: 10, status: 'Pending' },
    { id: 4, product: 'Bread', quantity: 3, status: 'Pending' },
    { id: 5, product: 'Eggs', quantity: 12, status: 'Pending' },
    { id: 6, product: 'Cheese', quantity: 2, status: 'Approved' },
    { id: 7, product: 'Apple', quantity: 8, status: 'Rejected' },
    { id: 8, product: 'Milk', quantity: 7, status: 'Pending' },
    { id: 9, product: 'Tomatoes', quantity: 4, status: 'Approved' },
    { id: 10, product: 'Bread', quantity: 6, status: 'Pending' },
    { id: 11, product: 'Eggs', quantity: 15, status: 'Rejected' },
  ];

  const [stock, setStock] = useState(initialStock);
  const [orders, setOrders] = useState(initialOrders);
  const [notification, setNotification] = useState(null); // { message: '', type: 'success'|'error'}
  const [sortBy, setSortBy] = useState('id'); // Sorting state
  const [sortOrder, setSortOrder] = useState('asc');
  const [loadingOrderId, setLoadingOrderId] = useState(null); // For button loading
  const [showAddForm, setShowAddForm] = useState(false); // For add order modal
  const [newOrder, setNewOrder] = useState({ product: '', quantity: 1 });

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') return aValue > bValue ? 1 : -1;
    return aValue < bValue ? 1 : -1;
  });

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  }

  function handleOrderCheck(orderId) {
    setLoadingOrderId(orderId);
    setTimeout(() => {
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order.id === orderId && order.status === 'Pending') {
            const availableQty = stock[order.product] || 0;
            if (availableQty >= order.quantity) {
              setStock(prevStock => ({
                ...prevStock,
                [order.product]: availableQty - order.quantity,
              }));
              setNotification({ message: `Order #${orderId} approved!`, type: 'success' });
              return { ...order, status: 'Approved' };
            } else {
              setNotification({ message: `Insufficient ${order.product} stock for Order #${orderId}`, type: 'error' });
              return { ...order, status: 'Rejected' };
            }
          }
          return order;
        });
      });
      setLoadingOrderId(null);
    }, 1000); // Simulate processing delay
  }

  function handleAddOrder() {
    if (newOrder.product && newOrder.quantity > 0) {
      const newId = Math.max(...orders.map(o => o.id)) + 1;
      setOrders([...orders, { id: newId, ...newOrder, status: 'Pending' }]);
      setNewOrder({ product: '', quantity: 1 });
      setShowAddForm(false);
      setNotification({ message: 'New order added!', type: 'success' });
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Orders Management</h2>

      {/* Notification */}
      {notification && (
        <div
          className={`mb-6 p-4 rounded-lg shadow-md transition-all duration-300 animate-fade-in ${
            notification.type === 'success'
              ? 'bg-green-100 border border-green-300 text-green-800'
              : 'bg-red-100 border border-red-300 text-red-800'
          }`}
          role="alert"
        >
          <div className="flex items-center">
            <span className="mr-2">{notification.type === 'success' ? '✅' : '❌'}</span>
            {notification.message}
          </div>
        </div>
      )}

      {/* Add New Order Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
        >
          Add New Order
        </button>
      </div>

      {/* Add Order Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New Order</h3>
            <select
              value={newOrder.product}
              onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Product</option>
              {Object.keys(stock).map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
            <input
              type="number"
              value={newOrder.quantity}
              onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) || 1 })}
              className="w-full p-2 border rounded mb-4"
              min="1"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100">
              <th
                className="p-4 text-left cursor-pointer hover:bg-green-200 transition"
                onClick={() => handleSort('id')}
              >
                Order ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="p-4 text-left cursor-pointer hover:bg-green-200 transition"
                onClick={() => handleSort('product')}
              >
                Product {sortBy === 'product' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4 text-left">Quantity</th>
              <th
                className="p-4 text-left cursor-pointer hover:bg-green-200 transition"
                onClick={() => handleSort('status')}
              >
                Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map(({ id, product, quantity, status }) => (
              <tr
                key={id}
                className="border-b hover:bg-gray-50 transition animate-fade-in"
              >
                <td className="p-4">#{id}</td>
                <td className="p-4">{product}</td>
                <td className="p-4">{quantity}</td>
                <td
                  className={`p-4 font-bold ${
                    status === 'Approved'
                      ? 'text-green-600'
                      : status === 'Rejected'
                      ? 'text-red-600'
                      : 'text-orange-600'
                  }`}
                >
                  {status}
                </td>
                <td className="p-4">
                  {status === 'Pending' ? (
                    <button
                      onClick={() => handleOrderCheck(id)}
                      disabled={loadingOrderId === id}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition transform hover:scale-105"
                      title="Check stock and update order"
                    >
                      {loadingOrderId === id ? 'Processing...' : 'Check & Update'}
                    </button>
                  ) : (
                    <em className="text-gray-500">No action</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Current Stock Display */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-green-700">Current Stock Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(stock).map(([product, qty]) => (
            <div
              key={product}
              className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <strong className="text-green-600">{product}:</strong> {qty} units
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}