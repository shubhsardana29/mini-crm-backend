const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const audienceRoutes = require('./routes/audience');
const campaignRoutes = require('./routes/campaigns');
const deliveryRoutes = require('./routes/delivery');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


// MongoDB connection URL
const mongoURI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

connectToDatabase();

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/audience', audienceRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/sendCampaign', deliveryRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
