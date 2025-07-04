# CRM Digest API

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

A Node.js Express application that generates HTML email content for Dynamics CRM digests at First West Credit Union. This service integrates with Power Automate flows to format and deliver weekly advisor digests via Outlook email.

## 🎯 Purpose

This application serves as a formatting service in a larger workflow:
1. **Power Automate** queries and organizes data from Dynamics CRM
2. **This API** formats the data into professional HTML email content
3. **Power Automate** sends the formatted digest to recipients via Outlook

Currently supports the **Advisor Digest** (delivered every Monday), with plans for additional digest types.

## 🚀 Features

- **Advisor Digest Generation**: Creates comprehensive weekly summaries for financial advisors
- **HTML Email Templates**: Professional, Outlook-optimized email formatting
- **CRM Integration**: Processes structured data from Dynamics CRM
- **Appointment Visualization**: Includes heatmap data for appointment scheduling
- **Mortgage Tracking**: Displays matured and renewing mortgage information
- **Responsive Design**: Email templates optimized for various email clients

### 📋 Planned Features
- Branch Leader Digest
- Director Digest  
- President's Digest

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Setup
```bash
# Clone the repository
git clone https://github.com/colinxii/Digest-V2.git
cd Digest-V2

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔧 Usage

### Starting the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Run tests
npm test
```

The server will start on `http://localhost:3000` (or the port specified in `PORT` environment variable).

### API Endpoints

#### Health Check
```http
GET /health
```
Returns server status for monitoring purposes.

**Response:**
```
OK
```

#### Test Digest
```http
GET /advisor-digest/test
```
Generates a sample advisor digest using test data for development and testing.

**Response:** HTML email content

#### Generate Advisor Digest
```http
POST /advisor-digest
Content-Type: application/json
```

**Request Body:**
```json
{
  "recipient": {
    "name": "John Doe",
    "title": "Senior Financial Advisor",
    "tracking_url": "https://example.com/tracking"
  },
  "matured_mortgages": [
    {
      "date": "2025-06-30T10:00:00",
      "amount": 500000,
      "members": "Smith Family",
      "last_update": "2025-01-04T10:00:00",
      "crm_link": "https://crm.example.com/mortgage1"
    }
  ],
  "renewing_mortgages": [
    {
      "date": "2025-07-30T10:00:00",
      "amount": 50000,
      "members": "Johnson, Mary",
      "last_update": "2025-10-01T10:00:00",
      "crm_link": "https://crm.example.com/mortgage2"
    }
  ],
  "appointments": [
    {
      "date": "2025-06-30T09:00:00",
      "members": "Brown, Robert",
      "crm_link": "https://crm.example.com/appointment1",
      "coconut_link": "https://coconut.example.com/1",
      "service": "Financial Planning",
      "last_update": "2025-06-16T09:00:00"
    }
  ],
  "appointmentData": [
    {
      "Day": 17,
      "Month": 6,
      "Year": 2025,
      "Count": 4
    }
  ]
}
```

**Response:** HTML email content ready for delivery

## 📁 Project Structure

```
├── index.js                    # Main application entry point
├── package.json                # Dependencies and scripts
├── routes/
│   └── advisorDigest.js        # Advisor digest API routes
├── utils/
│   └── dateUtils.js            # Date formatting utilities
├── views/
│   ├── advisordigest.ejs       # Main digest template
│   ├── header.ejs              # Email header template
│   ├── appointments.ejs        # Appointments section template
│   ├── heatmap.ejs             # Appointment heatmap template
│   ├── matured_mortgages.ejs   # Matured mortgages template
│   └── renewing_mortgages.ejs  # Renewing mortgages template
├── test.js                     # Test suite
├── test-digest-payload.json    # Sample test data
└── README.md                   # This file
```

## 🛠 Dependencies

### Production Dependencies
- **express** (^4.18.2): Web application framework
- **ejs** (^3.1.10): Embedded JavaScript templating
- **axios** (^1.10.0): HTTP client for API requests
- **dotenv** (^16.3.1): Environment variable management

### Development Dependencies
- **jest** (^29.7.0): Testing framework
- **supertest** (^7.1.1): HTTP assertion library
- **nodemon** (^3.0.3): Development server with auto-reload

## 📜 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with auto-reload
npm test           # Run test suite
npm run build      # Run full build process (install, test, validate)
npm run build:prod # Production build (dependencies only)
```

## 🔗 Integration Workflow

This API is part of a larger automated workflow:

1. **Power Automate Flow** queries Dynamics CRM for relevant data
2. **Data Processing** organizes and structures the CRM data
3. **API Call** sends structured data to this service via POST request
4. **HTML Generation** processes data through EJS templates
5. **Email Delivery** Power Automate receives HTML and sends via Outlook

## 🧪 Testing

The project includes basic health check tests. To run tests:

```bash
npm test
```

To test the digest generation manually:
```bash
# Start the server
npm run dev

# Visit the test endpoint
curl http://localhost:3000/advisor-digest/test
```

## 🔧 Development

### Adding New Digest Types

1. Create new route file in `routes/` directory
2. Create corresponding EJS templates in `views/` directory
3. Register routes in `index.js`
4. Add test data and test cases

### Template Development

Templates use EJS syntax and are optimized for email clients:
- Inline CSS for maximum compatibility
- Table-based layouts for Outlook support
- Conditional comments for Outlook-specific styling

## 🏢 Environment

This application is designed for internal use at First West Credit Union and integrates with:
- **Dynamics CRM**: Source of member and financial data
- **Power Automate**: Workflow orchestration
- **Outlook**: Email delivery system

## 📧 Email Compatibility

Templates are optimized for:
- Outlook (Desktop and Web)
- Gmail
- Apple Mail
- Other major email clients

## 🔒 Security

- Internal use only within First West Credit Union
- Forward prevention policy restricts external transmission
- No external API dependencies for sensitive operations

## 🚧 Future Development

Planned enhancements include:
- **Branch Leader Digest**: Weekly summaries for branch managers
- **Director Digest**: Executive-level reporting
- **President's Digest**: High-level organizational metrics
- Enhanced data visualization components
- Additional email template themes

## 📞 Support

For technical support or questions about this application, please contact the development team or refer to the internal documentation system.

---

*This application is intended solely for internal use within First West Credit Union and its divisions.*
