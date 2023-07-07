const crypto = require('crypto');

function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

const jwtSecretKey = generateRandomString(32); // Generate a random string of 32 characters

module.exports = jwtSecretKey;