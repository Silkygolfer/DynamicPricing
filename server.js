const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PricingAdjustment = require('/Users/Admin/Desktop/Full Stack Test Code/DynamicPricing')


const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Serve the HTML file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle POST requests to the API endpoint
app.post('/api/data', (req, res) => {
    const { month, day, time, rate, upperBound, lowerBound } = req.body;

    console.log('Received JSON data:', req.body)

    //Run the inputs through the PricingAdjustment tool

    let priceAdjustment = new PricingAdjustment(month, day, time, rate, upperBound, lowerBound);
    let responseData = priceAdjustment.calculateFinalRate();

    // Send the processed data back as a response
    res.json(responseData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});