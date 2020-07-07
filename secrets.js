module.exports = {
    // Don't worry this my my eqiuvlent to an ENV. All these will be different and protected in our in our heroku deployment ENV 
    jwtSecret: process.env.JWT_SECRET || `sr22`,
    PORT: process.env.PORT || 7423,
    env: process.env.DB_ENV || "development"
  };
  