const express = require("express");
const cors = require("cors");
const healthRoute = require("./routes/healthRoute");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FarmLink API Running");
});

app.use("/api/health", healthRoute);
app.use("/api/auth", authRoutes);




module.exports = app;