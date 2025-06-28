require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const { getRelativeTimeString } = require('./utils/dateUtils');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

// Middleware
app.use(express.json());

const checkJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const client = jwksRsa({
    jwksUri: `https://login.microsoftonline.com/685bcef1-56df-4af4-bcc6-7327c5ddfc40/discovery/v2.0/keys`
  });

  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return callback(err);
      }
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    });
  };

  jwt.verify(token, getKey, {
    audience: `api://2ee6bd3a-2b78-47a3-a7be-e6c2161adc83`,
    issuer: `https://login.microsoftonline.com/685bcef1-56df-4af4-bcc6-7327c5ddfc40/v2.0`,
    algorithms: ['RS256']
  }, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Routes
app.get('/', (req, res) => {
  res.status(200).send('CRM Digest API is running! Visit /weekly-advisor-digest/test to see a sample digest.');
});

app.get('/weekly-advisor-digest/test', checkJwt, async (req, res, next) => {
  try {
    const rawData = await fs.promises.readFile(path.join(__dirname, 'test-digest-payload.json'));
    const digestData = JSON.parse(rawData);
    digestData.today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    digestData.getRelativeTimeString = getRelativeTimeString;
    console.log('Digest Data today:', digestData.today);
    res.render('views/advisordigest', digestData, (err, html) => {
      if (err) {
        console.error('Error rendering EJS template:', err);
        return res.status(500).json({ error: 'Error rendering template, see Colin or line 32 of index.js.' });
      }

      res.json({ success: true, secretMessage: 'Hello, Sam!', digestHtml: html });
    });
  } catch (err) {
    next(err);
  }
});

app.post('/weekly-advisor-digest', (req, res) => {
  var digestData = req.body;
  digestData.today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  digestData.getRelativeTimeString = getRelativeTimeString;
  res.render('views/advisordigest', digestData);
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
