// difficulty.js
'use strict';
const util = require('../util');

exports.handler = {
	canHandle(handlerInput) {
		const req = handlerInput.requestEnvelope.request;
		return req.type === 'IntentRequest'
			&& req.intent.name === 'DifficultyIntent';
	},
	async handle(handlerInput) {
		let res = await util.httpGet('public.turtlenode.io', '/info', 11898)
			.catch(() => {
				return null;
			});

		const speechText = `The current difficulty is ${JSON.parse(res).difficulty}.`;

		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};