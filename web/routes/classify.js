var express = require('express');
var router = express.Router();
var request = require('request');
var NLC = require('watson-developer-cloud/natural-language-classifier/v1');

var classifierId = process.env.CLASSIFIER_ID || 'e9fa7bx367-nlc-825';
router.post('/', function(req, res, next) {
  classify(req, res);
});

function classify(req, res) {
  var creds = creds();
  console.log(req.body);
  var nlc = new NLC(creds);
  console.log('here');
  nlc.classify({
    text: req.body.text,
    classifier_id: classifierId,
  }, function(err,response){
    if (err) {
      console.log(err)
      res.status(500).send(err);
    } else {
      res.json(response)
    }
  })

  function creds() {
    // Extract Bluemix creds for Watson NLC service
    var VCAP = process.env.VCAP_SERVICES
    if (VCAP) {
      return (JSON.parse(VCAP)).natural_language_classifier[0].credentials;
    }
    else {
     
    }
  }
}

module.exports = router;
