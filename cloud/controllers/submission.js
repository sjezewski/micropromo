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
    var nextURL = 'survey/new';

    submission.save().then(
	function() {
	    res.render('submission/new', {submission: submission.id, nextURL: nextURL})
	},
	function() {
	    res.send(500, 'Failed saving survey');
	}
    );
}