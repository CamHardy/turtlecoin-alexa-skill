// nodeList.js
// tell the user a short list of available public node
//TODO: find some way to prompt the user to pick a node to get more info
//TODO: check that the voice response sounds ok
'use strict';
const util = require('../util');

exports.handler = {
	canHandle(handlerInput) {
		const req = handlerInput.requestEnvelope.request;
		return req.type === 'IntentRequest'
			&& req.intent.name === 'NodeListIntent';
	},
	async handle(handlerInput) {
		let res = await util.httpsGet('trtl.nodes.pub', '/api/getNodes')
			.catch(() => {
				return null;
			});

		let json = JSON.parse(res)[0];
		let feeString = json.fee == 0 ? 'It has no fee' : `It has a fee of ${json.fee}`;
		let ssl = json.ssl ? 'https://' : 'http://';

		const speechText = `Here's one that I found: ${json.name}. `+
												`${feeString}. ` + 
												`You can connect to it at ${ssl}${json.url}:${json.port}.`;

		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};