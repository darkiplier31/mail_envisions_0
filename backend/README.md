# Backend Server for Customer Form Submission

This backend server handles customer form submissions and provides an API to check customer email existence.

## Setup

1. Install dependencies:
```bash
npm install express cors nodemailer sqlite3 body-parser dotenv
```

2. Create a `.env` file in the root directory and add your email configuration:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

For Gmail, you'll need to use an App Password instead of your regular password:
- Go to Google Account settings
- Enable 2-factor authentication
- Generate an App Password for "Mail"
- Use this App Password in the EMAIL_PASS variable

## Running the Server

Start the backend server:
```bash
npm run dev:backend
```

The server will run on `http://localhost:8080`

## API Endpoints

- `POST /submit-form` - Submit customer form data and send email notification
- `GET /checkmail?email=example@email.com` - Check if customer email exists in the database
- `GET /customers` - Get all customer records
- `GET /` - Health check and API documentation

## Database

The server uses SQLite to store customer information in a `customers.db` file.