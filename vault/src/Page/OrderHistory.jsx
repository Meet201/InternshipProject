import React, { useState, useEffect } from 'react';
     import { DollarSign, Calendar, Package } from 'lucide-react';
     import api from '../utils/api';
     import '../assets/OrderHistory.css';

     const OrderHistory = () => {
         const [orders, setOrders] = useState([]);
         const [loading, setLoading] = useState(true);
         const [error, setError] = useState(null);

         useEffect(() => {
             const fetchOrders = async () => {
                 try {
                     const response = await api.get('/payment/orders');
                     setOrders(response.data.orders);
                     setLoading(false);
                 } catch (err) {
                     setError('Failed to fetch order history. Please try again.');
                     setLoading(false);
                 }
             };
             fetchOrders();
         }, []);

         if (loading) return <div className="loading">Loading...</div>;
         if (error) return <div className="error">{error}</div>;

         return (
             <div className="order-history-container">
                 <h2>Your Order History</h2>
                 {orders.length === 0 ? (
                     <p>No orders found.</p>
                 ) : (
                     <div className="orders-grid">
                         {orders.map((order) => (
                             <div key={order._id} className="order-card">
                                 <div className="order-header">
                                     <h3>{order.accessoryName}</h3>
                                     <span className={`status ${order.status}`}>
                                         {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                     </span>
                                 </div>
                                 <div className="order-details">
                                     <p><Package size={16} /> <strong>Item ID:</strong> {order.accessoryId}</p>
                                     <p><DollarSign size={16} /> <strong>Amount:</strong> ${order.amount.toFixed(2)} {order.currency.toUpperCase()}</p>
                                     <p><User size={16} /> <strong>Name:</strong> {order.userName}</p>
                                     <p><Mail size={16} /> <strong>Email:</strong> {order.userEmail}</p>
                                     <p><MapPin size={16} /> <strong>Billing Address:</strong> {order.billingAddress.street}, {order.billingAddress.city}, {order.billingAddress.state}, {order.billingAddress.postalCode}, {order.billingAddress.country}</p>
                                     <p><Calendar size={16} /> <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                     <p><strong>Transaction ID:</strong> {order.paymentIntentId}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 )}
             </div>
         );
     };

     export default OrderHistory;