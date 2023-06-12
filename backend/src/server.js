const express = require("express");
const connectDB = require("./db/mongoDB");
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");
const ErrorHandler = require("./middlewares/ErrorHandler");
const { BlogRoutes } = require("./routes/BlogRoutes");

const app = express();
app.use(express.json());
app.use("/api/users", UserRoutes);
app.use("/api/blogs", BlogRoutes);
app.use(ErrorHandler);

const startServer = async () => {
  const response = await connectDB();
  app.listen(5000, () => {
    console.log("Server listening from port 5000");
  });
};

startServer();
