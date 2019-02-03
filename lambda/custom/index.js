'use strict';

const Alexa = require('ask-sdk-core');
const http = require('http');
const https = require('https');

function httpsGet(_host, _path) {
  return new Promise(((resolve, reject) => {
    var options = {
      host: _host,
      port: 443,
      path: _path,
      method: 'GET'
    };

    let req = https.request(options, (res) => {
      res.setEncoding('utf8');
      let returnData = '';

      res.on('data', (chunk) => {
        returnData += chunk;
      });

      res.on('end', () => {
        resolve(returnData);
      });

      res.on('error', (error) => {
        reject(error);
      });
    });
    req.on('socket', (sock) => {
      sock.setTimeout(7000);
      sock.on('timeout', () => {
        req.abort();
      });
    });

    req.on('error', (error) => {
      reject(error);
    });
    req.end();
  }));
}

const LaunchRequestHandler = {
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

const PriceHandler = {
  canHandle(handlerInput) {
    const req = handlerInput.requestEnvelope.request;
    return req.type === 'IntentRequest'
      && req.intent.name === 'PriceIntent';
  },
  async handle(handlerInput) {
    let trtl = await httpsGet('tradeogre.com', '/api/v1/ticker/BTC-TRTL')
      .catch(() => {
        return null;
      });
    let btc = await httpsGet('www.bitstamp.net', '/api/ticker')
      .catch(() => {
        return null;
      });

    let price = null;
    if (trtl && btc) {
      var trtlPrice = parseFloat(JSON.parse(trtl).price).toFixed(8);
      var btcPrice = parseFloat(JSON.parse(btc).last);
      price = trtlPrice * btcPrice;
    }

    const speechText = 'The current price is ' + (price ? 
      `${price} USD.`:
      'unavailable.');

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();   
  }
};

const ListNodesHandler = {};
const DifficultyHandler = {};
const VolumeHandler = {};
const HeightHandler = {};
const HashrateHandler = {};
const GeneralInfoHandler = {};
const CoinInfoHandler = {};
const CoinAuthorHandler = {};
const SkillAuthorHandler = {};
const SupplyHandler = {};
const CirculationHandler = {};
const FactsHandler = {};
const OriginStoryHandler = {};
const BlockRewardHandler = {};
const DevelopersHandler = {};
const MembersHandler = {};
const SocialLinksHandler = {};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PriceHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
