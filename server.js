const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Sponsor} = require('./db/Sponsor');

const app = express();
var port = process.env.PORT || 3100;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});  

app.use(bodyParser.json());

app.get('/sponsors', (req, res) => {
	Sponsor.find().then(sponsor => {
        res.send(sponsor);
    }).catch(err => {
		res.send(err);
	});
});

app.post('/sponsors', (req, res) => {
	var NewSponsor = new Sponsor({
		by: req.body.by,
		createdBy: req.body.createdBy,
		dateCreated: req.body.date,
		type: req.body.type,
		description: req.body.des,
		priceRange: req.body.priceRange,
		requests: []
	});

	NewSponsor.save().then((doc) => {
		res.send(doc);
	}).catch(err => {
		res.send(err);
	});
});

app.get('/sponsors/:id', (req, res) => {
	var id = req.params.id;

	Sponsor.find({createdBy}).then((sponsor) => {
		res.send(sponsor);
	}).catch(err => {
		res.send(err);
	});
});

app.delete('/sponsors', (req, res) => {
	Sponsor.find().remove().then((doc) => {
		res.send(doc);
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});