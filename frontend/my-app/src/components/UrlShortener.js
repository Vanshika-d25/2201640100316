import React, { useState } from 'react';
import axios from 'axios';

function UrlShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/shorten', { longUrl: url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      setShortUrl('');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied to clipboard!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '400px',
        textAlign: 'center'
      }}>
        <h2>URL Shortener</h2>
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        />
        <button
          onClick={handleShorten}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {shortUrl && (
          <div style={{ marginTop: '20px' }}>
            <p>Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            <br />
            <button
              onClick={handleCopy}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                borderRadius: '5px',
                border: '1px solid #007BFF',
                backgroundColor: 'white',
                color: '#007BFF',
                cursor: 'pointer'
              }}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UrlShortener;
