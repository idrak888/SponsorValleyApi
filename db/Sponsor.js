const {mongoose} = require('./mongoose');

const Sponsor = mongoose.model('Sponsor', {
	by: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	dateCreated: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	priceRange: {
		minprice: {type: Number, required: true},
		maxprice: {type: Number, required: true}
	},
	requests: [{
      	by: String,
      	askingPrice: Number,
      	description: String,
      	date: String
    }]
});

module.exports = {
	Sponsor
}