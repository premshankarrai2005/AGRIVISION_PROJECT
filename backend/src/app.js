const express = require("express");
const cors = require("cors");
const healthRoute = require("./routes/healthRoute");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FarmLink API Running");
});

app.use("/api/health", healthRoute);



module.exports = app;