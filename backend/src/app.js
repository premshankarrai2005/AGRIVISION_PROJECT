const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Routes
const healthRoute = require("./routes/healthRoute");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// Security Middleware
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});
app.use(limiter);


app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);


// Body Parser
app.use(express.json());

// Logger
app.use(morgan("dev"));

// Home Route
app.get("/", (req, res) => {
  res.send("FarmLink API Running");
});

// API Routes
app.use("/health", healthRoute);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}); 

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});   

module.exports = app;
