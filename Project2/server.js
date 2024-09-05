// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require('@sendgrid/mail'); // Import SendGrid module
const app = express();

// Set your SendGrid API key//
sgMail.setApiKey('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'); // SendGrid API key

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route for handling GET requests
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


// Route for handling POST requests
app.post('/', async (req, res) => {

    const email = req.body.email;

    const msg = {
        to: email, // Recipient's email address
        from: 'ansh4764.be23@chitkara.edu.in', // Your verified sender email
        subject: 'Thanks for subscribing',
        text: 'You have joined the platinum membership of our firm',
    };

    try {
        const response = await sgMail.send(msg);
        console.log('Email sent successfully :=)', response);
        res.send("Subscription successful! Check your email.");
    } catch (error) {
        console.error('Error while sending the email:', error);
        res.send("Sorry there was an error! please try again");
    }
});

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});