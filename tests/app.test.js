const app = require('../server/app');
const request = require('supertest');

// tests route to look up stock quote
describe('GET /buy/:ticker/:qty', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  it('It should get the current price of a stock by ticker symbol', async () => {
      // gets latest price of Spotify share
      const response = await request(app).get('/buy/SPOT/3');
      expect(response.body.ticker).toBe('SPOT');
      expect(response.body.shares).toBe('3');
      expect(response.body.price).toBeGreaterThan(0);
      expect(response.statusCode).toBe(200);
  })
});
