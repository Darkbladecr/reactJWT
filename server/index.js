const app = new (require('express'))();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fortunes = require('./fortunes.json');
const port = 3001;
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	next();
});
if (!process.env.SECRET) {
	process.env.SECRET = 'jwtRocks';
}

app.get('/quote', function(req, res) {
	const random = Math.floor(Math.random() * 10);
	res.json({ message: `Welcome, your lucky number is: ${random}`, id: 0 });
});

app.post('/login', bodyParser.json(), function(req, res) {
	// set expiration to 1 day
	const today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 1);

	const token = jwt.sign(
		{
			_id: 1,
			username: req.body.username,
			exp: parseInt(exp.getTime() / 1000),
		},
		process.env.SECRET
	);

	res.json(token);
});

// Restricted paths
// const jwtMiddleware = require('./jwtMiddleware');
// app.use(jwtMiddleware);

app.get('/', function(req, res) {
	res.send('Welcome, your token is valid!');
});

app.get('/secretQuote', function(req, res) {
	const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.json(fortune);
});

app.listen(port, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info('Server running on http://localhost:%s/', port);
	}
});
