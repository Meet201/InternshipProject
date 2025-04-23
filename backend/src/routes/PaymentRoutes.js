const express = require('express');
const router = express.Router();
const { createPaymentIntent, getOrders } = require('../controllers/PaymentController');
const authMiddleware = require('../middleware/auth');

router.post('/create-payment-intent', createPaymentIntent);
router.get('/orders', authMiddleware, getOrders);

module.exports = router;