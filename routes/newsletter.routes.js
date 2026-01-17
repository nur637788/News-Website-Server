const express = require("express");
const router = express.Router();
const Newsletter = require("../models/newsletter.model");

// Subscribe
router.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const exists = await Newsletter.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Already subscribed" });
        }

        const subscriber = await Newsletter.create({ email });

        res.status(201).json({
            message: "Subscribed successfully",
            subscriber,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: get all subscribers
router.get("/", async (req, res) => {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
});

module.exports = router;
