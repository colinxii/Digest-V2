# CRM Digest API

[![Azure Deployment Status](https://github.com/colinxii/Digest-V2/actions/workflows/azure-webapps-node.yml/badge.svg)](https://github.com/colinxii/Digest-V2/actions)

API for generating weekly advisor digest emails from Dynamics CRM data. Formats mortgage and appointment information into HTML emails with visual heatmaps and time-based categorization.

## Features

- Generates HTML email digests from CRM data
- Visual heatmap of appointment activity
- Time-based categorization of mortgages (matured/renewing)
- Weekly appointment overview
- Responsive email design

## Technologies

- Node.js 22.x
- Express 4.x
- EJS templating
- Jest for testing
- Azure Web Apps for deployment

## Installation

```bash
git clone https://github.com/colinxii/Digest-V2.git
cd Digest-V2
npm install
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### API Endpoints

- `GET /health` - Health check endpoint
- `GET /weekly-advisor-digest/test` - Test endpoint (uses test data)
- `POST /weekly-advisor-digest` - Production endpoint (requires JSON payload)

## Project Structure

```
/views
  advisordigest.ejs       # Main email template
  header.ejs              # Email header section
  matured_mortgages.ejs   # Matured mortgages section  
  renewing_mortgages.ejs  # Renewing mortgages section
  heatmap.ejs             # Appointment heatmap
  appointments.ejs        # Upcoming appointments
/test
  test.js                 # Basic route tests
```

## Data Schema

See `digest-schema.ts` for the complete TypeScript interface defining the expected payload structure.

## Testing

```bash
npm test
```

## Deployment

Automatically deployed to Azure Web Apps via GitHub Actions on push to main branch.

## Configuration

Set environment variables:
- `PORT` - Server port (default: 3000)

## Contributing

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push to the branch
5. Create a pull request

## License

ISC
