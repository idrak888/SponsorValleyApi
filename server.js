const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Sponsor} = require('./db/Sponsor');

const app = express();
var port = process.env.PORT || 3100;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "X-Auth");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

app.use(bodyParser.json());

app.get('/sponsors', (req, res) => {
	Sponsor.find().then(sponsor => {
        res.send(sponsor);
    });
});

app.post('/sponsors', (req, res) => {
	var NewSponsor = new Sponsor({
		by: req.body.by,
		dateCreated: req.body.date,
		type: req.body.type,
		description: req.body.des,
		priceRange: req.body.priceRange,
		requests: []
	});

	NewSponsor.save().then((doc) => {
		res.send(doc);
	});
});

app.get('/sponsors/:by', (req, res) => {
	var by = req.params.by;

	Sponsor.find({by}).then((sponsor) => {
		res.send(sponsor);
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});