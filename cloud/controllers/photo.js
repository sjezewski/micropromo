var _ = require('underscore');
//var Photo = Parse.File.extend("Photo");
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

exports.create = function(req, res) {
    var photo = new Photo();
//    photo.save().then(
    var realPhoto = new Parse.File(req.body.name, req.body.photo)
    realPhoto.save().then(
	function() {
	    res.redirect('/photo?hey')
	},
	function() {
	    res.send(500, 'Failed saving photo');
	}
    );
/*
      photo.save(_.pick(req.body, 'name','photo')).then(

	function() {
	    res.redirect('/photo')
	},
	function() {
	    res.send(500, 'Failed saving photo');
	}
    );*/
}

exports.new = function(req, res) {
    res.render('photo/new', {});
}