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

  var query = new Parse.Query(Promo);
  var promo = new Promo();
  promo.id = req.query.promo;
  query.equalTo("objectId", promo.id);  

  var success = {success: true};
  var promoError = {error: true, message: "Nonexistent promo code"};

  query.first(
    {
      success: function(thispromo) {

        if(thispromo === undefined) {
          res.send(500, JSON.stringify(promoError));          
          return
        }

        // TODO: In the future you'd also check here that the promo hasn't been used

        res.send(200, JSON.stringify(success));

      },
      error: function(error) {
        promoError.details = error;
        res.send(500, JSON.stringify(error));     
      }
    }
  );

}