__author__ = 'dimascio'
# edited 5/7/18 by ZM and MK

import requests
import json

# Replace YOUR_CLASSIFIER_ID, YOUR_CLASSIFIER_USERNAME, and YOUR_CLASSIFIER_PASSWORD
# with the information provided in your classifier's credentials object
def classify(s):
    return requests.post("https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers/e9fa7bx367-nlc-825/classify",
                      json.dumps({'text':s}),
                      auth=("YOUR_CLASSIFIER_USERNAME", "YOUR_CLASSIFIER_PASSWORD"),
                      headers={'Content-Type': 'application/json'})

# Read test data into test array

test = []
with open('data/Email-testingdata.json') as testData:
	test=json.load(testData);
	# Classify each test observation and store its prediction and label
	predictionsAndLabels = map(lambda o:  (classify(o['Text']).json(), o['Class'][0] ), test)

	# Calculate the classifier's accuracy by comparing:
	# Number of correct predictions / Number of test observations
	accuracy = 1.0 * len(filter(lambda x: x[0]['top_class'] == x[1], predictionsAndLabels)) / len(test)
	print "accuracy: %s" % accuracy
