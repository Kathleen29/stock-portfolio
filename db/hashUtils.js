const crypto = require('crypto');

// creates hash using the password and adds salt
// returns hash as a string
const createHash = (password, salt) => {
  let hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
};

// compares attempted password and salt to actual password in the db
const compareHash = (attempted, actual, salt) => {
  return createHash(attempted, salt) === actual;
};

// returns a random 16 byte string
const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = {
  createHash,
  compareHash,
  createSalt
};
