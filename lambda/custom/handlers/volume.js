// volume.js
// tell the user the current volume of TRTL in USD
'use strict';
const util = require('../util');

exports.handler = {
	canHandle(handlerInput) {
		const req = handlerInput.requestEnvelope.request;
		return req.type === 'IntentRequest'
			&& req.intent.name === 'VolumeIntent';
	},
	async handle(handlerInput) {
		let trtl = await util.httpsGet('tradeogre.com', '/api/v1/ticker/BTC-TRTL')
			.catch(() => {
				return null;
			});
		let btc = await util.httpsGet('www.bitstamp.net', '/api/ticker')
			.catch(() => {
				return null;
			});

		let volume = null;
		if (trtl && btc) {
			let trtlVol = parseFloat(JSON.parse(trtl).volume).toFixed(8);
			let btcVol = parseFloat(JSON.parse(btc).last);
			volume = trtlVol * btcVol;
		}

		const speechText = 'The current volume of <sub alias="turtle">TRTL</sub> is ' + (volume ? 
			`${volume.toFixed(2)} USD.`:
			'unavailable.');

		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};