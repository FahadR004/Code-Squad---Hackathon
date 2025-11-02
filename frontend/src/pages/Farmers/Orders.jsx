import React, { useState, useEffect } from 'react';

export default function OrdersPage() {
  const initialStock = {
    Apple: 10,
    Milk: 15,
    Tomatoes: 8,
    Bread: 12,
    Eggs: 20,
    Cheese: 5,
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
  const [notification, setNotification] = useState(null);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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
      setOrders(prevOrders =>
        prevOrders.map(order => {
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
              setNotification({
                message: `Insufficient ${order.product} stock for Order #${orderId}`,
                type: 'error',
              });
              return { ...order, status: 'Rejected' };
            }
          }
          return order;
        })
      );
      setLoadingOrderId(null);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-lime-100 py-10 px-6 font-sans transition-all">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-green-800 drop-shadow-sm">
          🌾 Orders Management
        </h2>

        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg shadow-md transition-all duration-500 transform ${
              notification.type === 'success'
                ? 'bg-green-100 border border-green-400 text-green-800 scale-105'
                : 'bg-red-100 border border-red-400 text-red-800 scale-105'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2">{notification.type === 'success' ? '✅' : '❌'}</span>
              {notification.message}
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl transition-transform hover:scale-[1.01] duration-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-200 text-green-900">
                <th
                  className="p-4 text-left cursor-pointer hover:bg-green-300 transition"
                  onClick={() => handleSort('id')}
                >
                  Order ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-green-300 transition"
                  onClick={() => handleSort('product')}
                >
                  Product {sortBy === 'product' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 text-left">Quantity</th>
                <th
                  className="p-4 text-left cursor-pointer hover:bg-green-300 transition"
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
                  className="border-b hover:bg-green-50 transition-all duration-200"
                >
                  <td className="p-4 font-semibold text-gray-700">#{id}</td>
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
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition transform hover:scale-105 shadow-md"
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
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-2xl hover:shadow-green-200 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-6 text-green-800">🌱 Current Stock Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(stock).map(([product, qty]) => (
              <div
                key={product}
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition transform hover:scale-105 shadow-sm"
              >
                <strong className="text-green-700">{product}:</strong> {qty} units
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
