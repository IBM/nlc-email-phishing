/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

require('dotenv').config({
  silent: true,
});

const express = require('express');
const router = express.Router();
const request = require('request');
const NLC = require('watson-developer-cloud/natural-language-classifier/v1');
const vcapServices = require('vcap_services');

var classifierId = process.env.CLASSIFIER_ID

var  creds = creds()
if (creds == null){
  console.log("Failure to create creds")
}

console.log("CLASSIFIER_ID:")
console.log(classifierId)

router.post('/', function(req, res, next) {
  classify(req, res);
});

function classify(req, res) {
  console.log("Classifying:")
  console.log(req.body);

  var nlc = new NLC(creds);

  nlc.classify({
    text: req.body.text,
    classifier_id: classifierId
  }, function(err,response){
    if (err) {
      console.log(err)
    } else {
      res.json(response)
    }
  })
}

function creds() {
  // Preference is .env file
  if (process.env.NATURAL_LANGUAGE_CLASSIFIER_USERNAME) {
      var uname = process.env.NATURAL_LANGUAGE_CLASSIFIER_USERNAME
      var pword = process.env.NATURAL_LANGUAGE_CLASSIFIER_PASSWORD
  return {username: uname, password: pword}

  } else {
  // Extract Bluemix creds for Watson nlc service
  var VCAP = process.env.VCAP_SERVICES
    if (VCAP) {
      return (JSON.parse(VCAP)).natural_language_classifier[0].credentials;
   }
  }
}

module.exports = router;
