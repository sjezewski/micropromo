var _ = require('underscore');
var Survey = Parse.Object.extend("Survey");

exports.index = function(req, res) {
    var query = new Parse.Query(Survey);
    query.descending('createdAt');
    query.find().then(
	function(results) {
	    res.render(
		'survey/index',
		{ surveys: results}
	    );
	},
	function() {
	    res.send(500, 'Failed to load surveys');
	}
    );
}

exports.create = function(req, res) {
    var survey = new Survey();

    survey.set("parent", req.body.submission);

    // This is where you would do any data validations

    survey.save(_.pick(req.body, 'all', 'gain', 'purex', 'tide', 'xtra')).then(
	function() {
	    res.redirect('/promo/create?submission=' + req.body.submission)
	},
	function() {
	    res.send(500, 'Failed saving survey');
	}
    );
}

exports.new = function(req, res) {
    res.render('survey/new', {submission: req.query.submission});
}