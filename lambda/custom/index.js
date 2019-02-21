/* eslint-disable  func-names */
/* eslint-disable  no-console */

const purposeText="We exist to grow loving communities of Jesus-followers who live and share his irreligious message."
const valuesText="We walk in the way of Jesus, toward community, simplicity, and peace, with a mission to invite others to join us."
const visionText="To introduce spiritually curious people to the Jesus-centred life, through a movement of local Jesus-centred churches"
const playThisWeekTeachingText="Here's this weeks teaching:"

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to The Meeting House, you can say play the latest teaching or help!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const PlayThisWeeksTeachingIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PlayThisWeeksTeachingIntent';
  },
  handle(handlerInput) {
    const speechText = playThisWeekTeachingText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(playThisWeekTeachingText, speechText)
      .getResponse();
  },
};
const ValuesStatementIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ValuesStatementIntent';
  },
  handle(handlerInput) {
    const speechText = valuesText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(valuesText, speechText)
      .getResponse();
  },
};
const PurposeStatementIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PurposeStatementIntent';
  },
  handle(handlerInput) {
    const speechText = purposeText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(purposeText, speechText)
      .getResponse();
  },
};

const VisionStatementIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'VisionStatementIntent';
  },
  handle(handlerInput) {
    const speechText = visionText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(visionText, speechText)
      .getResponse();
  },
};

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
      .withSimpleCard('Hello World', speechText)
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
      .withSimpleCard('Hello World', speechText)
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
      PlayThisWeeksTeachingIntent,
VisionStatementIntent,
PurposeStatementIntent,
ValuesStatementIntent,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
