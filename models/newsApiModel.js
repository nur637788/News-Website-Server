const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: String,
    slug: String,
    category: String,
    author: String,
    publishedDate: Date,
    image: String,
    shortDescription: String,
    content: String,
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "published"], default: "pending" },  
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);

