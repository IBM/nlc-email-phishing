__author__ = 'dimascio'
# edited 5/7/18 by ZM and MK

import requests
import json

# Replace NATURAL_LANGUAGE_CLASSIFIER_USERNAME and
# NATURAL_LANGUAGE_CLASSIFIER_PASSWORD with the information provided in
# your classifier's credentials object
# Use the NLC_CLASSIFIER_ID obtained after training the model
NATURAL_LANGUAGE_CLASSIFIER_USERNAME = ""
NATURAL_LANGUAGE_CLASSIFIER_PASSWORD = ""
NLC_CLASSIFIER_ID = ""
GATEWAY_URL = "https://gateway.watsonplatform.net/"
NLC_PATH = "natural-language-classifier/api/v1/classifiers/"


def classify(s):
    return requests.post(GATEWAY_URL + NLC_PATH + NLC_CLASSIFIER_ID + "/classify",
                         data={'text':s},
                         auth=(NATURAL_LANGUAGE_CLASSIFIER_USERNAME,
                               NATURAL_LANGUAGE_CLASSIFIER_PASSWORD),
                         headers={'Content-Type': 'application/json'})


# Read test data into test array
test = []

with open('data/Email-testingdata.json') as testData:
    test = json.load(testData)
    # Classify each test observation and store its prediction and label
    predictionsAndLabels = map(lambda o:  (classify(o['Text']).json(),
                               o['Class'][0]), test)

# Calculate the classifier's accuracy by comparing:
# Number of correct predictions / Number of test observations
    accuracy = 1.0 * len(filter(lambda x: x[0]['top_class'] == x[1],
                         predictionsAndLabels)) / len(test)
print "accuracy: %s" % accuracy
