require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const agent = require("user-agents");
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const Mercury = require('@postlight/mercury-parser');

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT;


// Https upgrade on App Engine
app.set('trust proxy', true);

app.use((req, res, next) => {
	if (req.secure) {
		next();
	} else {
		res.redirect('https://' + req.headers.host + req.url);
	}
});


app.use(express.static(path.join(__dirname, 'build')));


// Misc middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


// Rate limiter for all parsing requests
const parseLimit = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	headers: false,
	message: "Wow, you're doing a lot of reading! To keep the app running smoothly, please hold off for 15 minutes then try again."
});


// Rate limiter for all other requests
const genLimit = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 100,
	headers: false,
	message: "Too. Many. Requests. Are you SPAMMING me??"
});


app.use('/parse', parseLimit);


app.post('/parse', (req, res) => {
	const ua = new agent({deviceCategory: req.body.agent}).data.userAgent;

	Mercury
		.parse(req.body.url, {
			contentType: req.body.type,
			headers: {
				'DNT': 1,
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.5',
				'Accept-Encoding': 'br, gzip, deflate',
				'Origin': 'https://www.google.com',
				'Referer': 'https://www.google.com/',
				'User-Agent': ua
			}
		})
		.then((response) => {
			res.json({article: response, success: true});
		})
		.catch((error) => {
			res.json({success: false, code: 'TK-421', message: 'Server could not parse requested data.'});
		});
});


app.use('/*', genLimit);

app.get('/*', (req, res) => {res.sendFile(path.join(__dirname, 'build', 'index.html'));});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));