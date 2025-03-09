require("dotenv").config();
const http = require("http");
require('./config/db.js');
const redisClient = require('./config/redis');
const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server is running on port', PORT, '...');
});

// Handle unexpected errors
process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Promise Rejection:", reason);
});