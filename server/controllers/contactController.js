const nodemailer = require('nodemailer');

function isValidEmail(email) {
  return /.+@.+\..+/.test(email);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendContact(req, res) {
  try {
    const { name, email, message, company } = req.body || {};

    // Honeypot: if filled, silently accept without sending
    if (typeof company === 'string' && company.trim().length > 0) {
      return res.json({ success: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ error: 'Email service not configured. Please try again later.' });
    }

    // Configure transporter
    let transporter;
    if (process.env.SMTP_SERVICE) {
      // e.g. SMTP_SERVICE=gmail
      transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else if (process.env.SMTP_HOST) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true', // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      return res.status(500).json({ error: 'SMTP settings missing. Set SMTP_SERVICE or SMTP_HOST.' });
    }

    // Optional: verify connection/auth for clearer errors
    try {
      await transporter.verify();
    } catch (vErr) {
      console.error('SMTP verify failed:', vErr?.message || vErr);
      return res.status(500).json({ error: 'Email service authentication failed. Check SMTP credentials.' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMsg = escapeHtml(message).replace(/\n/g, '<br/>');

    const fromAddress = process.env.MAIL_FROM || `${safeName} via Portfolio <${process.env.SMTP_USER}>`;
    const toAddress = process.env.MAIL_TO || 'harikrishnananish0@gmail.com';

    const info = await transporter.sendMail({
      from: fromAddress, // MUST be your authenticated sender to avoid DMARC rejections
      to: toAddress, // Your inbox
      subject: `New contact from ${safeName} — Portfolio`,
      replyTo: `${safeName} <${safeEmail}>`, // replying goes to the user
      text: `${name} (${email}) wrote:\n\n${message}`,
      html: `<p><strong>Name:</strong> ${safeName}</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Message:</strong></p>
             <p>${safeMsg}</p>`,
    });

    return res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Contact error:', error?.message || error);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
}

module.exports = { sendContact };
