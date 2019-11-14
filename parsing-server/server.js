const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const agent = require("user-agents");
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const Mercury = require('@postlight/mercury-parser');


const app = express();

const API_PORT = 8080;

app.set('trust proxy', 1);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


const parseLimit = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
	headers: false,
	message: "Wow, you're doing a lot of reading! To keep the app running smoothly, please hold off for 15 minutes then try again. Thanks!"
});

const genLimit = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 10,
	headers: false,
	message: "Too. Many. Requests. Are you SPAMMING me??"
});



app.use('/parse', parseLimit);

app.post('/parse', async (req, res) => {
	const ua = await new agent({deviceCategory: req.body.agent}).data.userAgent;

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

app.post('/*', (req, res) => {
	res.json({message: 'Yowza! You hit an invalid endpoint.', success: false});
});

app.get('/*', (req, res) => {
	res.json({message: 'Yowza! You hit an invalid endpoint.', success: false});
});


app.listen(API_PORT, () => console.log(`Listening on port: ${API_PORT}`));