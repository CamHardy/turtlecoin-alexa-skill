// price.js
'use strict';
const util = require('../util');

exports.handler = {
	canHandle(handlerInput) {
		const req = handlerInput.requestEnvelope.request;
		return req.type === 'IntentRequest'
			&& req.intent.name === 'PriceIntent';
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

		let price = null;
		if (trtl && btc) {
			let trtlPrice = parseFloat(JSON.parse(trtl).price).toFixed(8);
			let btcPrice = parseFloat(JSON.parse(btc).last);
			price = trtlPrice * btcPrice;
		}

		const speechText = 'The current price of <sub alias="turtle">TRTL</sub> is ' + (price ? 
			`${price.toFixed(8)} USD.`:
			'unavailable.');

		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();   
	}
};