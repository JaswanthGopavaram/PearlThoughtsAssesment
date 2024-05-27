require('dotenv').config();
console.log('Email User:', process.env.EMAIL_USER); // Add this line for debugging
// The rest of your server.js code

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-email', (req, res) => {
  const { from, to, subject, text, html } = req.body;

  const mailOptions = {
    from: from || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log detailed error
      return res.status(500).send('Failed to send email: ' + error.toString()); // Send detailed error to client
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent: ' + info.response);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
