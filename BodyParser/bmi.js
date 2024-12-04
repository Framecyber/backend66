const express = require('express');
const app = express();

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/bmi_frontend.html');
});

// Handle form submission and calculate BMI
app.post('/', (req, res) => {
    const weight = parseFloat(req.body.weight);  // Weight in kg
    const height = parseFloat(req.body.height);  // Height in meters

    // Validation for weight and height
    if (isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
        return res.send('Please enter valid weight and height values greater than zero. <br><a href="/">Try Again</a>');
    }

    // BMI calculation formula: BMI = weight / (height * height)
    const bmi = weight / (height * height);

    let resultMessage = `<h2>Your BMI is: ${bmi.toFixed(2)}</h2><br><br>`;

    // Additional BMI categories
    if (bmi < 18.5) {
        resultMessage += '<p>You are underweight.</p>';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultMessage += '<p>You have a normal weight.</p>';
    } else if (bmi >= 25 && bmi < 29.9) {
        resultMessage += '<p>You are overweight.</p>';
    } else {
        resultMessage += '<p>You are obese.</p>';
    }

    // Send the result message with a link to try again
    res.send(resultMessage + `<br><a href="/">Try Again</a>`);
});

// Start the server
app.listen(3001, () => {
    console.log('Server started on port 3001!');
});
