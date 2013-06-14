var _ = require('underscore');
var Promo = Parse.Object.extend("Promo");

exports.create = function(req, res) {
  var promo = new Promo();
  promo.set("parent", req.query.submission);
  promo.save().then(
    function() {
      res.render('promo/complete', {promo: promo.id});
    },
    function() {
      res.send(500, 'Failed to create promo');
    }
  );
    

}

exports.check = function(req, res) {
  // Run query to see if promo code exists. 
  // Simple yes/no response is sufficient
}