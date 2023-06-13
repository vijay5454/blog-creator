const InvalidPathHandler = (req, res) => {
  return res.status(404).json({
    message: "Route not found!",
  });
};

module.exports = {
  InvalidPathHandler,
};
