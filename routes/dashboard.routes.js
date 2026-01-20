const express = require("express");
const router = express.Router();
const News = require("../models/newsApiModel");
const User = require("../models/userModel");

router.get("/stats", async (req, res) => {
    const totalNews = await News.countDocuments();
    const categories = await News.countDocuments();
    // const todayPublished = await News.countDocuments();
    const totalViews = await News.countDocuments();
    const publishedNews = await News.countDocuments({ status: "published" });
    const pendingNews = await News.countDocuments({ status: "pending" });
    const users = await User.countDocuments();

    res.json({
        totalNews,
        publishedNews,
        pendingNews,
        users,
        todayPublished: 8,
        totalViews,
        admins: 1,
        categories,
        monthlyGrowth: [],
    });
});

module.exports = router;
