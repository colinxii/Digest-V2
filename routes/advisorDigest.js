const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const { 
    getRelativeTimeString, 
    getPacificTime,
    formatCardDate,
    getMortgageRenewingRanges,
    getWeekDates,
    filterItemsByDateRange,
    calculateAppointmentStats
} = require('../utils/dateUtils');

// GET /advisor-digest/test - Redirect to test with HTML rendering
router.get('/test', async (req, res) => {
  res.redirect('/advisor-digest/test/true');
});

// GET /advisor-digest/test/:renderHtml - Test route with optional HTML rendering
router.get('/test/:renderHtml', async (req, res, next) => {
  try {
    const rawData = await fs.promises.readFile(path.join(__dirname, '../test-digest-payload.json'));
    const digestData = JSON.parse(rawData);
    digestData.today = getPacificTime();
    digestData.getRelativeTimeString = getRelativeTimeString;
    digestData.formatCardDate = formatCardDate;
    digestData.getMortgageRenewingRanges = getMortgageRenewingRanges;
    digestData.getWeekDates = getWeekDates;
    digestData.filterItemsByDateRange = filterItemsByDateRange;
    digestData.calculateAppointmentStats = calculateAppointmentStats;
    console.log('Digest Data today:', digestData.today);
    
    const renderHtml = req.params.renderHtml === 'true';
    console.log('Render HTML:', renderHtml, req.params.renderHtml);
    
    if (renderHtml) {
      return res.render('views/advisordigest', digestData);
    }
    
    res.render('views/advisordigest', digestData, (err, html) => {
      if (err) {
        console.error('Error rendering EJS template:', err);
        return res.status(500).json({ error: 'An error occurred while rendering the digest template.' });
      }

      res.json({ success: true, digestHtml: html });
    });
  } catch (err) {
    next(err);
  }
});

// POST /advisor-digest - Main digest endpoint
router.post('/', (req, res, next) => {
  try {
    const digestData = req.body;
    digestData.today = getPacificTime();
    digestData.getRelativeTimeString = getRelativeTimeString;
    digestData.formatCardDate = formatCardDate;
    digestData.getMortgageRenewingRanges = getMortgageRenewingRanges;
    digestData.getWeekDates = getWeekDates;
    digestData.filterItemsByDateRange = filterItemsByDateRange;
    digestData.calculateAppointmentStats = calculateAppointmentStats;
    
    res.render('views/advisordigest', digestData, (err, html) => {
      if (err) {
        console.error('Error rendering digest template:', err);
        return res.status(500).json({ error: 'An error occurred while rendering the digest template.' });
      }
      res.send(html);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
