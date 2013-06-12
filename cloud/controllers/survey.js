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
    survey.save(_.pick(req.body, 'all', 'gain', 'purex', 'tide', 'xtra')).then(
	function() {
	    res.redirect('/survey')
	},
	function() {
	    res.send(500, 'Failed saving survey');
	}
    );
}

exports.new = function(req, res) {
    res.render('survey/new', {});
}