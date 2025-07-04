
const express = require('express');
const path = require('path');

// Import route modules
const advisorDigestRoutes = require('./routes/advisorDigest');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

// Middleware
app.use(express.json());

// Mount route modules
app.use('/advisor-digest', advisorDigestRoutes);

// Routes
app.get('/', (req, res) => {
  res.status(200).send('CRM Digest API is running! Visit /advisor-digest/test to see a sample digest.');
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
