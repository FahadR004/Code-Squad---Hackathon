import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function OrdersPage() {
  const { t } = useTranslation();

  // Neutral keys for stock
  const initialStock = {
    apple: 10,
    milk: 15,
    tomatoes: 8,
    bread: 12,
    eggs: 20,
    cheese: 5,
  };

  // Mapping keys to translated names
  const PRODUCT_NAMES = {
    apple: t('Apple'),
    milk: t('Milk'),
    tomatoes: t('Tomatoes'),
    bread: t('Bread'),
    eggs: t('Eggs'),
    cheese: t('Cheese'),
  };

  const initialOrders = [
    { id: 1, product: 'apple', quantity: 5, status: 'pending' },
    { id: 2, product: 'milk', quantity: 5, status: 'pending' },
    { id: 3, product: 'tomatoes', quantity: 10, status: 'pending' },
    { id: 4, product: 'bread', quantity: 3, status: 'pending' },
    { id: 5, product: 'eggs', quantity: 12, status: 'pending' },
    { id: 6, product: 'cheese', quantity: 2, status: 'approved' },
    { id: 7, product: 'apple', quantity: 8, status: 'rejected' },
    { id: 8, product: 'milk', quantity: 7, status: 'pending' },
    { id: 9, product: 'tomatoes', quantity: 4, status: 'approved' },
    { id: 10, product: 'bread', quantity: 6, status: 'pending' },
    { id: 11, product: 'eggs', quantity: 15, status: 'rejected' },
  ];

  const [stock, setStock] = useState(initialStock);
  const [orders, setOrders] = useState(initialOrders);
  const [notification, setNotification] = useState(null);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOrder, setNewOrder] = useState({ product: '', quantity: 1 });

  // Auto dismiss notifications
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
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order.id === orderId && order.status === 'pending') {
            const availableQty = stock[order.product] || 0;
            if (availableQty >= order.quantity) {
              setStock(prevStock => ({
                ...prevStock,
                [order.product]: availableQty - order.quantity,
              }));
              setNotification({ message: t('OrderApproved', { id: orderId }), type: 'success' });
              return { ...order, status: 'approved' };
            } else {
              setNotification({ message: t('InsufficientStock', { product: PRODUCT_NAMES[order.product], id: orderId }), type: 'error' });
              return { ...order, status: 'rejected' };
            }
          }
          return order;
        })
      );
      setLoadingOrderId(null);
    }, 1000);
  }

  function handleAddOrder() {
    if (newOrder.product && newOrder.quantity > 0) {
      const newId = Math.max(...orders.map(o => o.id)) + 1;
      setOrders([...orders, { id: newId, ...newOrder, status: 'pending' }]);
      setNewOrder({ product: '', quantity: 1 });
      setShowAddForm(false);
      setNotification({ message: t('NewOrderAdded'), type: 'success' });
    }
  }

  // Function to display status in Urdu
  const displayStatus = (status) => {
    switch (status) {
      case 'pending':
        return t('Pending'); // انتظار میں
      case 'approved':
        return t('Approved'); // منظور شدہ
      case 'rejected':
        return t('Rejected'); // مسترد شدہ
      default:
        return status;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">{t('OrdersManagement')}</h2>

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
          {t('AddNewOrder')}
        </button>
      </div>

      {/* Add Order Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">{t('AddNewOrder')}</h3>
            <select
              value={newOrder.product}
              onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">{t('SelectProduct')}</option>
              {Object.keys(stock).map(product => (
                <option key={product} value={product}>{PRODUCT_NAMES[product]}</option>
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
                {t('Cancel')}
              </button>
              <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {t('Add')}
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
                {t('OrderID')} {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="p-4 text-left cursor-pointer hover:bg-green-200 transition"
                onClick={() => handleSort('product')}
              >
                {t('Product')} {sortBy === 'product' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4 text-left">{t('Quantity')}</th>
              <th
                className="p-4 text-left cursor-pointer hover:bg-green-200 transition"
                onClick={() => handleSort('status')}
              >
                {t('Status')} {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-4 text-left">{t('Action')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map(({ id, product, quantity, status }) => (
              <tr key={id} className="border-b hover:bg-gray-50 transition animate-fade-in">
                <td className="p-4">#{id}</td>
                <td className="p-4">{PRODUCT_NAMES[product]}</td>
                <td className="p-4">{quantity}</td>
                <td
                  className={`p-4 font-bold ${
                    status === 'approved'
                      ? 'text-green-600'
                      : status === 'rejected'
                      ? 'text-red-600'
                      : 'text-orange-600'
                  }`}
                >
                  {displayStatus(status)}
                </td>
                <td className="p-4">
                  {status === 'pending' ? (
                    <button
                      onClick={() => handleOrderCheck(id)}
                      disabled={loadingOrderId === id}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition transform hover:scale-105"
                    >
                      {loadingOrderId === id ? t('Processing') : t('CheckUpdate')}
                    </button>
                  ) : (
                    <em className="text-gray-500">{t('NoAction')}</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Current Stock Display */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-green-700">{t('CurrentStockStatus')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(stock).map(([product, qty]) => (
            <div key={product} className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              <strong className="text-green-600">{PRODUCT_NAMES[product]}:</strong> {qty} units
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
