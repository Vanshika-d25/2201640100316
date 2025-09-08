const generateShortId = require("../utils/generateShortId");
const urlDatabase = require("../models/urlModel");
const Log = require("../../middleware/logger");

async function createShortUrl(req, res) {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        await Log("backend", "error", "controller", "Missing originalUrl in request body");
        return res.status(400).json({ message: "originalUrl is required" });
    }

    const shortId = generateShortId();
    urlDatabase.push({ shortId, originalUrl });

    await Log("backend", "info", "controller", `Short URL created: ${shortId} -> ${originalUrl}`);

    res.status(201).json({ shortId });
}

async function redirectToOriginalUrl(req, res) {
    const { shortId } = req.params;

    const entry = urlDatabase.find(u => u.shortId === shortId);

    if (!entry) {
        await Log("backend", "warn", "controller", `ShortId not found: ${shortId}`);
        return res.status(404).json({ message: "Short URL not found" });
    }

    await Log("backend", "info", "controller", `Redirecting shortId: ${shortId} to ${entry.originalUrl}`);
    res.redirect(entry.originalUrl);
}

module.exports = { createShortUrl, redirectToOriginalUrl };
