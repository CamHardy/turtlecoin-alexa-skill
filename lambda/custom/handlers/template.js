// template.js
/*
*******************************************************
* This code is a general template for intent handlers *
*******************************************************
*/

'use strict';

exports.handler = {
	canHandle(handlerInput) {
		const req = handlerInput.requestEnvelope.request;
		return req.type === 'IntentRequest'
			&& req.intent.name === /* intent name */;
	},
	handle(handlerInput) {
		const speechText = /* output response */

		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};
