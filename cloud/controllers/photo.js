var _ = require('underscore');
var Photo = Parse.Object.extend("Photo");

exports.index = function(req, res) {
    var query = new Parse.Query(Photo);
    query.descending('createdAt');
    query.find().then(
	function(results) {
	    res.render(
		'photo/index',
		{ photos: results}
	    );
	},
	function() {
	    res.send(500, 'Failed to load photos');
	}
    );
}

exports.created = function(req, res) {
    res.render('photo/created',{photoURL: 'nada.png'});
}

exports.new = function(req, res) {
    res.render('photo/new', {});
}