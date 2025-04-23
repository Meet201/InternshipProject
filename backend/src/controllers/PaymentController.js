const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
     const Order = require('../models/OrderModel');
     const { sendingMail } = require('../utils/MailUtil');

     const createPaymentIntent = async (req, res) => {
         try {
             const { amount, currency = 'usd', accessoryId, accessoryName, userName, userEmail, billingAddress } = req.body;
             const userId = req.user?.id; // From authenticateToken middleware, if authenticated

             // Validate inputs
             if (!amount || amount < 1) {
                 return res.status(400).json({ error: true, message: 'Invalid amount' });
             }
             if (!accessoryId || !accessoryName) {
                 return res.status(400).json({ error: true, message: 'Accessory details are required' });
             }
             if (!userName || !userEmail) {
                 return res.status(400).json({ error: true, message: 'User details are required' });
             }
             if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
                 return res.status(400).json({ error: true, message: 'Invalid email format' });
             }
             if (!billingAddress || !billingAddress.street || !billingAddress.city || !billingAddress.state || !billingAddress.postalCode || !billingAddress.country) {
                 return res.status(400).json({ error: true, message: 'Complete billing address is required' });
             }

             // Create Payment Intent
             const paymentIntent = await stripe.paymentIntents.create({
                 amount: Math.round(amount * 100), // Convert to cents
                 currency,
                 payment_method_types: ['card'],
             });

             // Save order to MongoDB
             const order = new Order({
                 paymentIntentId: paymentIntent.id,
                 accessoryId,
                 accessoryName,
                 amount,
                 currency,
                 userId,
                 userName,
                 userEmail,
                 billingAddress,
                 status: 'pending'
             });
             await order.save();

             return res.status(200).json({
                 error: false,
                 clientSecret: paymentIntent.client_secret,
                 orderId: order._id,
                 paymentDetails: {
                     amount,
                     currency,
                     accessoryName,
                     userName,
                     userEmail,
                     billingAddress,
                     paymentIntentId: paymentIntent.id
                 }
             });
         } catch (error) {
             console.error('Error creating payment intent:', error.message);
             return res.status(500).json({ error: true, message: 'Server error', details: error.message });
         }
     };

     const getOrders = async (req, res) => {
         try {
             const userId = req.user.id; // From authenticateToken middleware
             const orders = await Order.find({ userId }).sort({ createdAt: -1 });
             return res.status(200).json({ error: false, orders });
         } catch (error) {
             console.error('Error fetching orders:', error.message);
             return res.status(500).json({ error: true, message: 'Server error', details: error.message });
         }
     };

     module.exports = { createPaymentIntent, getOrders };