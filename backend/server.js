const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const urls = {}; 

app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortCode = Math.random().toString(36).substring(2, 8);
    urls[shortCode] = longUrl;
    res.json({ shortUrl: `http://localhost:5000/${shortCode}` });
});


app.get('/:code', (req, res) => {
    const longUrl = urls[req.params.code];
    if (longUrl) {
        return res.redirect(longUrl);
    } else {
        return res.status(404).send('URL not found');
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
