require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = 5050;

async function startServer() {
  try {
    console.log("Starting Vendor AI backend...");

    await connectDB();

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log("==================================");
      console.log(`Express is listening on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
      console.log("==================================");
    });

    server.on("error", (err) => {
      console.error("SERVER ERROR:", err);
    });

    server.on("close", () => {
      console.log("SERVER CLOSED");
    });

  } catch (err) {
    console.error("STARTUP ERROR:");
    console.error(err);
  }
}

startServer();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:");
  console.error(err);
});