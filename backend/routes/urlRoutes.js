const express = require('express');
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/:shortId', redirectToOriginalUrl);

module.exports = router;
