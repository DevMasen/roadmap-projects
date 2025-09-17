// server/server.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(helmet());

// Enable CORS for the client (adjust origin in production)
app.use(
	cors({
		origin: true, // allow any origin (for dev). In production, replace with a specific origin.
	})
);

// Serve the frontend files
app.use(express.static(path.join(__dirname, '..', 'client')));

// Simple in-memory cache to reduce Reddit requests and avoid quick rate limits
const CACHE_TTL_MS = 30 * 1000; // 30 seconds cache
const cache = new Map(); // key -> { data, expiresAt }

// Validate subreddit name (prevent proxy abuse)
function validSubreddit(name) {
	return /^[A-Za-z0-9_]+$/.test(name);
}

app.get('/api/r/:subreddit', async (req, res) => {
	try {
		const subreddit = req.params.subreddit;
		let limit = parseInt(req.query.limit || '10', 10);
		if (Number.isNaN(limit) || limit <= 0) limit = 10;
		if (limit > 100) limit = 100;

		if (!validSubreddit(subreddit)) {
			return res.status(400).json({ error: 'Invalid subreddit name' });
		}

		const cacheKey = `${subreddit}:${limit}`;
		const cached = cache.get(cacheKey);
		if (cached && cached.expiresAt > Date.now()) {
			return res.json(cached.data);
		}

		const url = `https://www.reddit.com/r/${encodeURIComponent(
			subreddit
		)}.json?limit=${limit}`;

		// Reddit likes a descriptive User-Agent
		const USER_AGENT = 'web:client:0.1 (by /u/Large-Ad6000)';

		const r = await axios.get(url, {
			headers: { 'User-Agent': USER_AGENT },
			timeout: 10000,
		});

		// store in cache
		cache.set(cacheKey, {
			data: r.data,
			expiresAt: Date.now() + CACHE_TTL_MS,
		});

		// Respond with Reddit JSON (and allow CORS)
		res.set('Access-Control-Allow-Origin', '*'); // only for dev, restrict in production
		res.json(r.data);
	} catch (err) {
		console.error('Proxy error:', err.toString());

		if (err.response) {
			// forward reddit error status/body (useful for debugging)
			return res.status(err.response.status).send(err.response.data);
		}
		res.status(500).json({ error: err.message });
	}
});

// Basic health route
app.get('/ping', (req, res) => res.send('ok'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started — open http://localhost:${PORT}`);
});
