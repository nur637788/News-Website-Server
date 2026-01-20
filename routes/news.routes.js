const express = require("express");
const router = express.Router();
const {
    getPublishedNews,
    postAddNews,
    getNewsBySlug,
    getPendingNews,
    publishNews,
    updateNews,
    deleteNews
} = require("../controllers/newsController");

// 🔹 Home page (published news)
router.get("/", getPublishedNews);

// 🔹 Add news
router.post("/", postAddNews);

// 🔹 Pending News (ADMIN)
router.get("/pending", getPendingNews);

// 🔹 Publish pending news (ADMIN)
router.put("/publish/:id", publishNews);

// ✏️ Edit
router.put("/:id", updateNews);

// 🗑 Delete
router.delete("/:id", deleteNews);

// 🔹 Single news by slug (⚠️ ALWAYS LAST)
router.get("/:slug", getNewsBySlug);

module.exports = router;
