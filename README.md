# Watson NLC Phishing E-mails

<img src="https://raw.githubusercontent.com/cdimascio/watson-nlc-spam/master/assets/watson-nlc.png"  width="200"  align="right" /></br>

Expanding upon a previous sample app, built with Watson Natural Language Classifier by Carmine DiMascio, this new sample application will be focused on phishing emails and identifying them as spam. Note: Watson Natural Language Classifier can be trained to identify various types of emails, given that it is trained with the proper dataset. In this case we will be using the Enron emails as training data.

You will learn how to train an email spam classfier, validate its accuracy, classify new texts, and run it as a web application.

### Try the web demo:
https://nlc-email-spam.mybluemix.net/

### This project contains:

* Training data

* Test data

* A Python script to measure accuracy

## What you'll need

### Prerequisites

* [Python](https://www.python.org/downloads/)

* [curl](http://curl.haxx.se/download.html)

* [IBM Cloud Account](www.bluemix.net)

* An instance of the [Watson Natural Language Classifier service on IBM Cloud](https://console.bluemix.net/catalog/services/natural-language-classifier?hideTours=true&cm_mmc=OSocial_Tumblr-_-Watson+Core_Watson+Core+-+Platform-_-WW_WW-_-wdc-ref&cm_mmc=OSocial_Tumblr-_-Watson+Core_Watson+Core+-+Platform-_-WW_WW-_-wdc-ref&cm_mmca1=000000OF&cm_mmca2=10000409)

## How is this repo organized

#### Layout

* `data/Email-trainingdata-20k.csv` - Email training data

* `data/Email-testingdata.csv` - Email test data

* `spam.py` - A python script used to measure the accuracy of the classifier

* `web/` - The node.js based [web demo](http://nlc-emailspam.mybluemix.net)

#### The data

Data files are a modification of the [Enron Email Dataset](https://www.edrm.net/resources/data-sets) as found on EDRM.net. The data is available under a Creative Commons Attribution 3.0 Unported License. That means you are free to share, remix, or make commercial use of the content so long as you provide attribution.

## How-To

See the ["Create a natural language classifier that identifies spam"](https://www.ibm.com/developerworks/library/cc-spam-classification-service-watson-nlc-bluemix-trs/index.html) developerWorks article for specific details. Be sure to use the email dataset from this repo rather than the original text messages dataset. If you are familiar with the service, follow the general outline below.

#### Create a Natural Language Classifier instance on IBM Cloud

* Go to IBM Cloud catalog and select [Watson Natural Language Classifier](https://console.bluemix.net/catalog/services/natural-language-classifier)

#### Train the Natural Language classifier using training data

Training a classifier is easy and can be done in 2 ways. The first way is more technical in nature and involves directly calling the API. The second method leverages the GUI based tooling.

#### First Method
Simply, provide training data in a Watson NLC compatible format (.csv) and POST a request to the Watson NLC `/classifiers` REST endpoint.

* Open`data/Email-trainingdata-20k.csv` to view the data format
* Train Watson NLC

    ```
  curl -X POST -u username:password -F training_data=@Email-trainingdata-20k.csv \
   -F training_metadata="{\"language\":\"en\",\"name\":\"My Classifier\"}" \
  "https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers"
    ```
#### Second Method 

Access the GUI based tooling by logging into your [IBM Cloud Dashboard](https://console.us-east.bluemix.net/dashboard/services). 

In the Services area, click your Natural Language Classifier service tile to open the instance dashboard. Once in the service dashboard, click 'Open tool' and upload your training data.

For more information, see the [specific documentation](https://console.bluemix.net/docs/services/natural-language-classifier/tool-overview.html#managing-toolkit).

#### Measuring Accuracy of your classifier

* Open `spam.py` and supply values for:
  _ `YOUR_CLASSIFIER_ID`
  _ `YOUR_CLASSIFIER_USERNAME` \* `YOUR_CLASSIFIER_PASSWORD`

* Run `pip install requests`

* Run `python spam.py`

## About the Data

Use [Watson Natural Language Classifier](https://www.ibm.com/watson/services/natural-language-classifier/) to predict email spam. The training data is a public set of emails from the former company [Enron](https://en.wikipedia.org/wiki/Enron).

While the [full corpus](https://en.wikipedia.org/wiki/Enron_Corpus) contains over 600k emails, this subset has been modified to just under 20k emails with spam and ham labels. More information about the Enron corpus can be found [here](https://en.wikipedia.org/wiki/Enron_Corpus).

The dataset was downloaded from [EDRM] (edrm.net). Except where otherwise noted, the content posted at EDRM.net is licensed under a Creative Commons Attribution 3.0 Unported License. 

That means you are free to share, remix or make commercial use of the content so long as you provide attribution. To provide attribution.

## Links


## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

Copyright 2015-2018 Zia Mohammad

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
