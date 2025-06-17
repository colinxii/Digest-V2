require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('CRM Digest API is running! Visit /weekly-advisor-digest/test to see a sample digest.');
});

app.get('/weekly-advisor-digest/test', (req, res) => {
  var rawData = fs.readFileSync(path.join(__dirname, 'test-digest-payload.json'));
  var digestData = JSON.parse(rawData);
  digestData.today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  console.log('Digest Data today:', digestData.today);
  res.render('views/advisordigest', digestData);
});

app.post('/weekly-advisor-digest', (req, res) => {
  res.render('views/advisordigest', req.body);
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Export the app for testing
module.exports = app;

// Only start the server if running directly (not when imported for tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CRM Digest API running on port ${PORT}`);
  });
}
