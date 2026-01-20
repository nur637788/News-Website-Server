const News = require("../models/newsApiModel");

// Home page: শুধু published news দেখাবে
exports.getPublishedNews = async (req, res) => {
    try {
        const news = await News.find({ status: "published" })
            .sort({ createdAt: -1 }); // latest news আগে দেখাবে
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST - Add News
exports.postAddNews = async (req, res) => {
    try {
        const news = new News({
            ...req.body,
            status: "pending", // by default pending
        });

        await news.save();
        res.status(201).json({ message: "News added successfully", news });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Single news by slug
exports.getNewsBySlug = async (req, res) => {
    try {
        const news = await News.findOne({ slug: req.params.slug });
        if (!news) return res.status(404).json({ message: "News not found" });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get pending news
exports.getPendingNews = async (req, res) => {
    try {
        const news = await News.find({ status: "pending" }).sort({ createdAt: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Publish news
exports.publishNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: "News not found" });

        news.status = "published";
        await news.save();

        res.json({ message: "News published successfully", news });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✏️ Update news
exports.updateNews = async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }

        res.json({ message: "News updated", updatedNews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🗑 Delete news
exports.deleteNews = async (req, res) => {
    try {
        const deleted = await News.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "News not found" });
        }

        res.json({ message: "News deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
