var _ = require('underscore');
var Submission = Parse.Object.extend("Submission");

exports.index = function(req, res) {
    var query = new Parse.Query(Submission);
    query.descending('createdAt');
    query.find().then(
	function(results) {
	    res.render(
		'submission/index',
		{ submissions: results}
	    );
	},
	function() {
	    res.send(500, 'Failed to load photos');
	}
    );
}

exports.created = function(req, res) {
    res.render('submission/created',{photoURL: 'nada.png'});
}

exports.new = function(req, res) {
    var submission = new Submission();

    // Note -- javascript strings can't be converted to bytes, so you cannot create a photo file from a string
    // But, the 'parseExpressRawBody()' seems to allow to parse http data into a byte array ... in which case we may be able to do the photo upload purely server side

    submission.save().then(
	function() {
	    res.render('submission/new', {submission: submission.id})
	},
	function() {
	    res.send(500, 'Failed saving survey');
	}
    );
}

exports.complete = function(req, res) {
    // Create a promo code for this user
    
    

    res.render('submission/complete');
}
