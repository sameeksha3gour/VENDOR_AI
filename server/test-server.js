const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Test Server Working",
  });
});

app.listen(5000, () => {
  console.log("✅ Test server running on port 5000");
});
