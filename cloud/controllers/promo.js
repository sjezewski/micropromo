var _ = require('underscore');
var Promo = Parse.Object.extend("Promo");

export.create = function(req, res) {
  var promo = new Promo();
  promo.set("parent", req.query.submission);
    
  res.render('promo/complete');
}

export.check = function(req, res) {

}