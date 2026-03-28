const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateVerificationCode = () => {
  return Math.random().toString().slice(2, 8);
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateVerificationCode,
};
