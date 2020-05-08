/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
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
const NLC = require('ibm-watson/natural-language-classifier/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


var classifierId = process.env.CLASSIFIER_ID
var apikey = process.env.NATURAL_LANGUAGE_CLASSIFIER_APIKEY
var url = process.env.NATURAL_LANGUAGE_CLASSIFIER_URL

console.log("CLASSIFIER_ID:")
console.log(classifierId)

router.post('/', function(req, res, next) {
  classify(req, res);
});

function classify(req, res) {
  console.log("Classifying:")
  console.log(req.body);

  var nlc = new NLC({
    authenticator: new IamAuthenticator({
      apikey: apikey,
    }),
    url: url,
  });

  nlc.classify({
    text: req.body.text,
    classifierId: classifierId

  }, function(err,response){
    if (err) {
      console.log(err)
    } else {
      res.json(response.result)
    }
  })
}

module.exports = router;
