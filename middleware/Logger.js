  
module.exports = function Logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}
        )}`
    );
  
    next();
  }