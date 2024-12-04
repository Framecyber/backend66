const express = require('express');
var bodyparser = require('body-parser');
const app = express();

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/public/styles.css');
});


//1. ทำ GET PATH ไปยัง /bmiCalculator เพื่อให้แสดง bmiCalculator.html
app.get('/bmiCalculator', (req, res) => {
    res.sendFile(__dirname + '/public/bmi_frontend.html');
})

//2. POST /bmiCalculator เพื่อรับค่า weight และ height จาก form และคํานวณ BMI และแสดงผลลัพธ์ในหน้า bmiCalculator.html
app.post('/bmiCalculator', (req, res) => {

    var weight = Number(req.body.weight); //String -> Number
    var height = Number(req.body.height); //String -> Number

    const BMI = weight/Math.pow(height,2)

    var description = ""

    if (BMI <= 18.5) description = "Underweight";
    else if (BMI <= 24.9) description = "Normal";
    else if (BMI <= 29.9) description = "Overweight";
    else description = "Obese";

    res.send("Your BMI is: " + Math.round(BMI) + " , you are " + description)
})

// Handle form submission
app.post('/', (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.send('Please enter valid numbers.');
    }

    const sum = num1 + num2;
    res.send(`<h1>Result: ${sum}</h1><br><a href="/">Back</a>`);
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000!');
});
