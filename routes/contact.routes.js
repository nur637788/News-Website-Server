const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/send", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields required" });
        }

        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
