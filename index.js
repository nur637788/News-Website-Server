const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "https://news-website-client-inky.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// 🔥 MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
// Login & Register
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Newsletter
const newsletterRoutes = require("./routes/newsletter.routes");
app.use("/api/newsletter", newsletterRoutes);

// ContactRoutes
const contactRoutes = require("./routes/contact.routes");
app.use("/api/contact", contactRoutes);

// newsApiRoutes
const newsRoutes = require("./routes/news.routes");
app.use("/api/news", newsRoutes);

// dashboard Routes
const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
