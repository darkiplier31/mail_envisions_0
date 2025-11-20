require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize SQLite database
const dbPath = path.join(__dirname, 'customers.db');
const db = new sqlite3.Database(dbPath);

// Create customers table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    firstName TEXT,
    lastName TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT,
    submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Create a very basic and safe transporter that won't crash the server
let transporter;
try {
  transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'localhost',
    port: process.env.SMTP_PORT || 1025,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    }
  });
} catch (transporterError) {
  console.error('Failed to create transporter, using safe mode:', transporterError.message);
  // Create a minimal transporter that won't crash
  transporter = {
    sendMail: async (options) => {
      console.log('Transporter in safe mode - email not sent, but server continues');
      console.log('Would send email to:', options.to, 'subject:', options.subject);
      return Promise.resolve({ messageId: 'safe-mode' });
    }
  };
}

// Function to send email safely without crashing server
async function sendEmailSafely(mailOptions) {
  try {
    // Check if transporter is properly created and has sendMail function
    if (transporter && typeof transporter.sendMail === 'function') {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', mailOptions.to);
      return true;
    } else {
      console.log('Transporter not available, skipping email');
      return false;
    }
  } catch (emailError) {
    console.error('Email sending failed (this is expected if MailHog is not running):', emailError.message);
    // Don't throw error - just return false to indicate failure
    return false;
  }
}

// Verify transporter connection when server starts with error handling
// But make it safer by not doing verification if transporter is in safe mode
if (transporter && typeof transporter.verify === 'function') {
  try {
    transporter.verify((error, success) => {
      if (error) {
        console.log('Mail service connection failed. This is expected if mail service is not running:', error.message);
      } else {
        console.log('Mail service connection successful');
      }
    });
  } catch (verifyError) {
    console.log('Transporter verification failed:', verifyError.message);
  }
} else {
  console.log('Transporter in safe mode, skipping verification');
}

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  console.log('Received form submission request'); // Debug log
  let responseSent = false;

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      country
    } = req.body;

    console.log('Extracted form data:', { email, firstName, lastName }); // Debug log

    // Validate required fields
    if (!email) {
      if (!responseSent) {
        responseSent = true;
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }
    }

    // Insert customer data into database with proper error handling
    try {
      console.log('Attempting database insert for:', email); // Debug log
      await new Promise((resolve, reject) => {
        const stmt = db.prepare(`INSERT OR IGNORE INTO customers
          (email, firstName, lastName, phone, address, city, state, zip, country)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [email, firstName, lastName, phone, address, city, state, zip, country],
          function(err) {
            if (err) {
              console.error('Database error:', err);
              reject(err);
            } else {
              console.log(`Inserted/updated customer: ${email}`);
              resolve(this);
            }
          });

        stmt.finalize();
      });
      console.log('Database operation completed successfully'); // Debug log
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      if (!responseSent) {
        responseSent = true;
        return res.status(500).json({
          success: false,
          message: 'Database error occurred'
        });
      }
    }

    // Send email safely without risking server crash
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'nodered@test.local',
        to: 'test@local.app', // Admin email where form submissions will be sent
        subject: 'New Customer Form Submission',
        html: `
          <h2>New Customer Form Submission</h2>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>ZIP:</strong> ${zip}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Submitted At:</strong> ${new Date().toISOString()}</p>
        `
      };

      // Send email safely - this function will never crash the server
      await sendEmailSafely(mailOptions);
    } catch (emailError) {
      console.error('Email preparation failed (non-fatal):', emailError);
      // Continue processing even if email preparation fails - this is non-fatal
    }

    // Ensure response is always sent
    if (!responseSent) {
      console.log('Sending successful response'); // Debug log
      responseSent = true;
      res.status(200).json({
        success: true,
        message: 'Form submitted successfully'
      });
    }
  } catch (error) {
    console.error('Unexpected error in form submission:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    }); // Additional debug log

    // Make sure to send a response even if we've already tried to
    // Check responseSent flag and ensure we don't send response twice
    if (!responseSent) {
      responseSent = true;
      try {
        res.status(500).json({
          success: false,
          message: 'An unexpected error occurred'
        });
      } catch (finalError) {
        console.error('Failed to send JSON error response:', finalError);
        // Final safeguard: make sure we don't send response twice
        if (!res.headersSent) {
          try {
            res.status(500).send('Error processing request');
          } catch (sendError) {
            console.error('Could not send any response:', sendError);
          }
        }
      }
    }
  }
});

// API endpoint to check if customer email exists
app.get('/checkmail', (req, res) => {
  const email = req.query.email;
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email parameter is required' 
    });
  }

  const query = 'SELECT * FROM customers WHERE email = ?';
  db.get(query, [email], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database error' 
      });
    }
    
    res.json({ 
      exists: !!row,
      customer: row || null
    });
  });
});

// API endpoint to get all customer emails
app.get('/customers', (req, res) => {
  const query = 'SELECT email, firstName, lastName, submittedAt FROM customers ORDER BY submittedAt DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database error' 
      });
    }
    
    res.json({ 
      success: true,
      customers: rows
    });
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Customer Form API Server is running',
    endpoints: {
      'POST /submit-form': 'Submit customer form data',
      'GET /checkmail?email=example@email.com': 'Check if customer email exists',
      'GET /customers': 'Get all customer records'
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

// Global error handlers to prevent server crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled application error:', err);
  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});