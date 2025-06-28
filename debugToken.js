const axios = require('axios');
const qs = require('qs');
const jwt = require('jsonwebtoken');

async function getToken() {
  const data = qs.stringify({
    'client_id': '2ee6bd3a-2b78-47a3-a7be-e6c2161adc83',
    'client_secret': 'tN38Q~HFtOjPjp1aEUBYJmfilEvPNKtjLdPKnauT',
    'scope': 'api://2ee6bd3a-2b78-47a3-a7be-e6c2161adc83/.default',
    'grant_type': 'client_credentials'
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://login.microsoftonline.com/685bcef1-56df-4af4-bcc6-7327c5ddfc40/oauth2/v2.0/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function debugToken() {
  try {
    console.log('Fetching token...');
    const token = await getToken();
    
    console.log('\n=== TOKEN RECEIVED ===');
    console.log('Token (first 50 chars):', token.substring(0, 50) + '...');
    
    // Decode without verification to see the contents
    const decoded = jwt.decode(token, { complete: true });
    
    console.log('\n=== DECODED HEADER ===');
    console.log(JSON.stringify(decoded.header, null, 2));
    
    console.log('\n=== DECODED PAYLOAD ===');
    console.log(JSON.stringify(decoded.payload, null, 2));
    
    console.log('\n=== KEY FIELDS ===');
    console.log('Audience (aud):', decoded.payload.aud);
    console.log('Issuer (iss):', decoded.payload.iss);
    console.log('Scopes (scp):', decoded.payload.scp || 'Not present');
    console.log('Roles:', decoded.payload.roles || 'Not present');
    console.log('App ID (appid):', decoded.payload.appid);
    console.log('Token Type:', decoded.payload.ver);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugToken();
