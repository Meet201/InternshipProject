const mongoose = require('mongoose');
     const Schema = mongoose.Schema;

     const orderSchema = new Schema({
         paymentIntentId: { type: String, required: true, unique: true },
         accessoryId: { type: Number, required: true },
         accessoryName: { type: String, required: true },
         amount: { type: Number, required: true },
         currency: { type: String, required: true },
         userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional, for authenticated users
         userName: { type: String, required: true },
         userEmail: { type: String, required: true },
         billingAddress: {
             street: { type: String, required: true },
             city: { type: String, required: true },
             state: { type: String, required: true },
             postalCode: { type: String, required: true },
             country: { type: String, required: true }
         },
         status: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending' },
         createdAt: { type: Date, default: Date.now }
     });

     module.exports = mongoose.model('Order', orderSchema);