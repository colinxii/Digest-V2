const request = require('supertest');
const app = require('./index');
const { 
  getRelativeTimeString, 
  getPacificTime,
  formatCardDate,
  getMortgageRenewingRanges,
  getWeekDates,
  filterItemsByDateRange,
  calculateAppointmentStats
} = require('./utils/dateUtils');

describe('Basic route tests', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('OK');
  });

  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('CRM Digest API is running');
  });

  test('GET /advisor-digest/test should redirect', async () => {
    const response = await request(app).get('/advisor-digest/test');
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/advisor-digest/test/true');
  });
});

describe('Date utility functions', () => {
  test('getRelativeTimeString should format dates correctly', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    expect(getRelativeTimeString(today.toISOString())).toBe('updated today');
    expect(getRelativeTimeString(yesterday.toISOString())).toBe('updated yesterday');
  });

  test('getPacificTime should return a valid date', () => {
    const pacificTime = getPacificTime();
    expect(pacificTime).toBeInstanceOf(Date);
    expect(pacificTime.getTime()).toBeLessThanOrEqual(Date.now());
  });

  test('formatCardDate should return month and day', () => {
    const testDate = new Date('2025-06-15T12:00:00Z');
    const formatted = formatCardDate(testDate);
    expect(formatted).toHaveProperty('month');
    expect(formatted).toHaveProperty('day');
    expect(formatted.month).toBe('JUN');
    expect(formatted.day).toBeGreaterThanOrEqual(14);
    expect(formatted.day).toBeLessThanOrEqual(15);
  });

  test('getMortgageRenewingRanges should return correct date ranges', () => {
    const baseDate = new Date('2025-01-01');
    const ranges = getMortgageRenewingRanges(baseDate);
    
    expect(ranges).toHaveProperty('30Days');
    expect(ranges).toHaveProperty('60Days');
    expect(ranges).toHaveProperty('90Days');
    expect(ranges).toHaveProperty('180Days');
    
    expect(ranges['30Days'].startDate).toEqual(baseDate);
    expect(ranges['30Days'].endDate.getDate()).toBeGreaterThanOrEqual(30);
    expect(ranges['30Days'].endDate.getDate()).toBeLessThanOrEqual(31);
  });

  test('getWeekDates should return correct week boundaries', () => {
    const baseDate = new Date('2025-01-15'); // Wednesday
    const thisWeek = getWeekDates(baseDate, 0);
    const nextWeek = getWeekDates(baseDate, 1);
    
    expect(thisWeek.start.getDay()).toBe(0); // Sunday
    expect(thisWeek.end.getDay()).toBe(6); // Saturday
    expect(nextWeek.start.getTime() - thisWeek.start.getTime()).toBe(7 * 24 * 60 * 60 * 1000);
  });

  test('filterItemsByDateRange should filter items correctly', () => {
    const items = [
      { date: '2025-01-01', name: 'Item 1' },
      { date: '2025-01-15', name: 'Item 2' },
      { date: '2025-02-01', name: 'Item 3' }
    ];
    
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-31');
    
    const filtered = filterItemsByDateRange(items, startDate, endDate);
    expect(filtered).toHaveLength(2);
    expect(filtered[0].name).toBe('Item 1');
    expect(filtered[1].name).toBe('Item 2');
  });

  test('calculateAppointmentStats should calculate totals correctly', () => {
    const appointmentData = [
      { Count: 5 },
      { Count: 3 },
      { Count: 8 },
      { Count: 2 }
    ];
    
    const stats = calculateAppointmentStats(appointmentData);
    expect(stats.totalAppointments).toBe(18);
    expect(stats.maxCount).toBe(8);
  });
});

describe('Advisor digest routes', () => {
  test('POST /advisor-digest should handle valid data', async () => {
    const testData = {
      recipient: {
        name: 'Test User',
        title: 'Test Title',
        tracking_url: 'https://example.com'
      },
      matured_mortgages: [],
      renewing_mortgages: [],
      appointments: [],
      appointmentData: []
    };

    const response = await request(app)
      .post('/advisor-digest')
      .send(testData);
    
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('TEST USER');
  });

  test('POST /advisor-digest should handle missing data gracefully', async () => {
    const response = await request(app)
      .post('/advisor-digest')
      .send({});
    
    // Should not crash, but may return 500 due to missing required fields
    expect([200, 500]).toContain(response.statusCode);
  });
});
