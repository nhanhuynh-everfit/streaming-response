// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  let count = 0;
  const interval = setInterval(() => {
    if (count >= 100) {
      clearInterval(interval);
      res.end(); // End the stream after 10 objects
      return;
    }
    const data = {
      id: count,
      message: `This is message ${count}`,
      timestamp: new Date().toISOString(),
    };
    res.write(JSON.stringify(data) + "\n");
    count++;
  }, 2000);
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
