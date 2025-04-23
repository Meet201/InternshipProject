const { sendingMail } = require('../utils/MailUtil');
const Car = require('../models/CarModel');

const sendContactEmail = async (req, res) => {
    try {
        const { carId, userName, userEmail, userPhone, message } = req.body;

        // Validate required fields
        if (!carId || !userName || !userEmail || !userPhone || !message) {
            return res.status(400).json({ error: true, message: 'All fields are required' });
        }

        // Find the car to get the dealer's email
        const car = await Car.findOne({ id: carId });
        if (!car || !car.dealer) {
            return res.status(404).json({ error: true, message: 'Car or dealer not found' });
        }

        // Prepare email content
        const subject = `Inquiry about ${car.name} from ${userName}`;
        const html = `
            <h2>New Inquiry for ${car.name}</h2>
            <p><strong>From:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Phone:</strong> ${userPhone}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Car Details:</strong></p>
            <ul>
                <li>Brand: ${car.brand}</li>
                <li>Year: ${car.year}</li>
                <li>Price: $${car.price.toLocaleString()}</li>
                <li>Type: ${car.type}</li>
            </ul>
        `;

        // Send email to the dealer
        await sendingMail(car.dealer, subject, html);

        return res.status(200).json({ error: false, message: 'Inquiry sent successfully' });
    } catch (error) {
        console.error('Error sending contact email:', error.message);
        return res.status(500).json({ error: true, message: 'Server error', details: error.message });
    }
};

module.exports = { sendContactEmail };