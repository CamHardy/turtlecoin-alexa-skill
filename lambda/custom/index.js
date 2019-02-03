'use strict';

//TODO: alphabetize these
const Alexa = require('ask-sdk-core');
const AlexaCancelAndStop = require('./handlers/alexa_cancelAndStop');
const AlexaError = require('./handlers/alexa_error');
const AlexaHelp = require('./handlers/alexa_help');
const AlexaLaunch = require('./handlers/alexa_launch');
const AlexaSessionEnded = require('./handlers/alexa_sessionEnded');
const Price = require('./handlers/price');
const Difficulty = require('./handlers/difficulty');

const ListNodesHandler = {};
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

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(
		AlexaCancelAndStop.handler,
		AlexaHelp.handler,
		AlexaLaunch.handler,
		AlexaSessionEnded.handler,
		Price.handler,
		Difficulty.handler
	)
	.addErrorHandlers(AlexaError.handler)
	.lambda();
