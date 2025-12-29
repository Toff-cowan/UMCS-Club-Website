// backend/server.js
// Main server file to set up and run the Express server, connect to MongoDB using Mongoose, and load environment variables.
//this file initializes the server for the backend of the UMCS Club Website. It connects to the MongoDB database using Mongoose and starts the Express server on the specified port.
// It also loads environment variables from a .env file for configuration.
// This setup allows the backend to handle API requests and interact with the database.
//ensures that the server is properly configured and ready to serve requests.

require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

// Safety check (recommended)
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
