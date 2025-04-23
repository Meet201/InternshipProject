import React, { useState, useEffect } from 'react';
     import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
     import { X, User, Mail, DollarSign, CheckCircle, MapPin } from 'lucide-react';
     import api from '../utils/api';
     import { getUser } from '../services/authService';
     import '../assets/PaymentModal.css';

     const PaymentModal = ({ accessory, onClose }) => {
         const stripe = useStripe();
         const elements = useElements();
         const [clientSecret, setClientSecret] = useState('');
         const [paymentDetails, setPaymentDetails] = useState(null);
         const [userDetails, setUserDetails] = useState({
             userName: '',
             userEmail: '',
             billingAddress: { street: '', city: '', state: '', postalCode: '', country: '' }
         });
         const [loading, setLoading] = useState(false);
         const [error, setError] = useState(null);
         const [success, setSuccess] = useState(false);

         useEffect(() => {
             // Pre-fill user details for authenticated users
             const fetchUser = async () => {
                 try {
                     const user = await getUser();
                     if (user) {
                         setUserDetails((prev) => ({
                             ...prev,
                             userName: user.name || '',
                             userEmail: user.email || ''
                         }));
                     }
                 } catch (err) {
                     console.error('Error fetching user:', err);
                 }
             };
             fetchUser();
         }, []);

         useEffect(() => {
             // Create Payment Intent when user details are ready
             const createPaymentIntent = async () => {
                 try {
                     const response = await api.post('/payment/create-payment-intent', {
                         amount: accessory.price,
                         accessoryId: accessory.id,
                         accessoryName: accessory.name,
                         userName: userDetails.userName,
                         userEmail: userDetails.userEmail,
                         billingAddress: userDetails.billingAddress
                     });
                     setClientSecret(response.data.clientSecret);
                     setPaymentDetails(response.data.paymentDetails);
                 } catch (err) {
                     setError('Failed to initialize payment. Please try again.');
                 }
             };
             if (userDetails.userName && userDetails.userEmail && userDetails.billingAddress.street) {
                 createPaymentIntent();
             }
         }, [accessory, userDetails]);

         const handleInputChange = (e) => {
             const { name, value } = e.target;
             if (name.includes('billingAddress.')) {
                 const field = name.split('.')[1];
                 setUserDetails((prev) => ({
                     ...prev,
                     billingAddress: { ...prev.billingAddress, [field]: value }
                 }));
             } else {
                 setUserDetails((prev) => ({ ...prev, [name]: value }));
             }
         };

         const handleSubmit = async (e) => {
             e.preventDefault();
             setLoading(true);
             setError(null);

             if (!stripe || !elements || !clientSecret) {
                 setError('Payment system not ready. Please try again.');
                 setLoading(false);
                 return;
             }

             if (!userDetails.userName || !userDetails.userEmail) {
                 setError('Please provide your name and email.');
                 setLoading(false);
                 return;
             }

             if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.userEmail)) {
                 setError('Please enter a valid email address.');
                 setLoading(false);
                 return;
             }

             if (!userDetails.billingAddress.street || !userDetails.billingAddress.city || !userDetails.billingAddress.state || !userDetails.billingAddress.postalCode || !userDetails.billingAddress.country) {
                 setError('Please provide a complete billing address.');
                 setLoading(false);
                 return;
             }

             const cardElement = elements.getElement(CardElement);

             const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                 payment_method: {
                     card: cardElement,
                 },
             });

             if (paymentError) {
                 setError(paymentError.message);
                 setLoading(false);
             } else if (paymentIntent.status === 'succeeded') {
                 setSuccess(true);
                 setTimeout(() => {
                     onClose();
                 }, 5000); // Close after 5 seconds
             }
         };

         return (
             <div className="modal-overlay" onClick={onClose}>
                 <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
                     <button className="modal-close" onClick={onClose}>
                         <X size={24} />
                     </button>
                     {!success ? (
                         <>
                             <h2>Pay for {accessory.name}</h2>
                             <p>Amount: ${accessory.price.toFixed(2)}</p>
                             {error && <div className="error-message">{error}</div>}
                             <form onSubmit={handleSubmit}>
                                 <div className="form-group">
                                     <label><User size={16} /> Name</label>
                                     <input
                                         type="text"
                                         name="userName"
                                         value={userDetails.userName}
                                         onChange={handleInputChange}
                                         required
                                         placeholder="Enter your name"
                                     />
                                 </div>
                                 <div className="form-group">
                                     <label><Mail size={16} /> Email</label>
                                     <input
                                         type="email"
                                         name="userEmail"
                                         value={userDetails.userEmail}
                                         onChange={handleInputChange}
                                         required
                                         placeholder="Enter your email"
                                     />
                                 </div>
                                 <div className="form-group">
                                     <label><MapPin size={16} /> Billing Address</label>
                                     <input
                                         type="text"
                                         name="billingAddress.street"
                                         value={userDetails.billingAddress.street}
                                         onChange={handleInputChange}
                                         required
                                         placeholder="Street Address"
                                     />
                                     <input
                                         type="text"
                                         name="billingAddress.city"
                                         value={userDetails.billingAddress.city}
                                         onChange={handleInputChange}
                                         required
                                         placeholder="City"
                                     />
                                     <input
                                         type="text"
                                         name="billingAddress.state"
                                         value={userDetails.billingAddress.state}
                                         onChange={handleInputChange}
                                         required
                                         placeholder="State"
                                     />
                                     <input
                                         type="text"
                                         name="billingAddress.postalCode"
                                         value={userDetails.billingAddress.postalCode}
                                         onChange={handleInputChange}
                                         required
                                         placeholder="Postal Code"
                                     />
                                     <input
                                         type="text"
                                         name="billingAddress.country"
                                         value={userDetails.billingAddress.country}
                                         onChange={handleInputChange}
                                         required
                                         placeholder="Country"
                                     />
                                 </div>
                                 <div className="card-element">
                                     <CardElement options={{ hidePostalCode: true }} />
                                 </div>
                                 <button type="submit" disabled={loading || !stripe || !clientSecret}>
                                     {loading ? 'Processing...' : 'Pay Now'}
                                 </button>
                             </form>
                         </>
                     ) : (
                         <div className="success-card">
                             <CheckCircle size={48} className="success-icon" />
                             <h2>Payment Successful!</h2>
                             <div className="success-details">
                                 <p><strong>Item:</strong> {paymentDetails?.accessoryName}</p>
                                 <p><strong>Amount:</strong> ${paymentDetails?.amount.toFixed(2)} {paymentDetails?.currency.toUpperCase()}</p>
                                 <p><strong>Name:</strong> {paymentDetails?.userName}</p>
                                 <p><strong>Email:</strong> {paymentDetails?.userEmail}</p>
                                 <p><strong>Billing Address:</strong> {paymentDetails?.billingAddress.street}, {paymentDetails?.billingAddress.city}, {paymentDetails?.billingAddress.state}, {paymentDetails?.billingAddress.postalCode}, {paymentDetails?.billingAddress.country}</p>
                                 <p><strong>Transaction ID:</strong> {paymentDetails?.paymentIntentId}</p>
                             </div>
                             <button className="close-button" onClick={onClose}>Close</button>
                         </div>
                     )}
                 </div>
             </div>
         );
     };

     export default PaymentModal;