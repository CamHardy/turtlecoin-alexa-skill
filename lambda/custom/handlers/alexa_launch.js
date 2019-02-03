// launch.js

'use strict';

exports.handler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak('Welcome to TurtleCoin. You are TurtleCoin.')
			.reprompt('What would you like to know about TurtleCoin?')
			.getResponse();
	}
};