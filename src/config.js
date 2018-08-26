const dotenv = require("dotenv");

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
// https://www.npmjs.com/package/dotenv
dotenv.config();

module.exports = {
  dbConnectionString: `${process.env.DB_URL}/${process.env.DB}`,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  port: process.env.PORT || 3000
};
