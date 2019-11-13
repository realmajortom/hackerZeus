require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const Mercury = require('@postlight/mercury-parser');
// import Mercury from '@postlight/mercury-parser';

const express = require('express');
const app = express();
const API_PORT = 8080;


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100
});

app.use(limiter);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());


app.post('/parse', (req, res) => {
	Mercury.parse(req.body.url, {
		contentType: 'text',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36	'
		}
	}).then(response => {
		res.json({article: response, success: true})
	});
});


app.get('/*', (req, res) => {
	res.json({message: 'Ha.', success: false});
});


app.listen(API_PORT, () => console.log(`Listening on port: ${API_PORT}`));