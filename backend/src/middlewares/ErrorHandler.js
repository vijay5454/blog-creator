const ErrorHandler = (err, req, res, next) => {
  console.log("Entered Error Handler");
  res.json({
    message: `${err.message}`,
  });
};

module.exports = ErrorHandler;
