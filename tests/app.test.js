const app = require('../server/app');
const request = require('supertest');

// tests route to look up stock quote
describe('GET /quote/:ticker', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  it('It should get the current price of a stock by ticker symbol', async () => {
      // gets latest price of Spotify share
      let response = await request(app).get('/quote/SPOT');
      expect(response.body.quote).toBeGreaterThan(0);
      expect(response.statusCode).toBe(200);
  })
});

// tests route to look up stock quote
describe('POST /buy', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  it('It should add a transaction to the database', async () => {
      // adds a transaction to the database
      let response = await request(app).post('/buy').send({ "ticker": "SPOT", "shares": 3, "quote": 141.80, "user_id": 1 });
      expect(response.statusCode).toBe(201);
  })
});

// tests sign-up
describe('POST /signup', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  it('It should add a new user to the database', async () => {
      // adds a transaction to the database
      let randomEmail = Math.floor(Math.random() * 1000) + '@example.com';
      let response = await request(app).post('/signup').send({ "email": randomEmail, "password": "testing123" });
      expect(response.statusCode).toBe(201);
  })
});

// tests login
describe('POST /login', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  it('It should verify a submitted email and password', async () => {
      // adds a transaction to the database
      let response = await request(app).post('/login').send({ "email": "test@example.com", "password": "testing123" });
      expect(response.statusCode).toBe(200);
  })
});

