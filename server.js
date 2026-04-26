require('dotenv').config();
const express    = require('express');
const path       = require('path');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Gmail transporter — uses App Password from .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'uxcelwithaj@gmail.com',
    pass: process.env.GMAIL_PASS,          // Gmail App Password (16 chars)
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    await transporter.sendMail({
      from:    `"${name}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to:      'uxcelwithaj@gmail.com',
      subject: `Portfolio inquiry from ${name}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log(`📩 Email sent from ${name} (${email})`);
    res.json({ success: true, message: 'Message sent! I\'ll get back to you soon.' });

  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to send. Please try again.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio running at http://localhost:${PORT}\n`);
});
