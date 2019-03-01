/* eslint-disable  func-names */
/* eslint-disable  no-console */

const purposeText="We exist to grow loving communities of Jesus-followers who live and share his irreligious message."
const valuesText="We walk in the way of Jesus, toward community, simplicity, and peace, with a mission to invite others to join us."
const visionText="To introduce spiritually curious people to the Jesus-centred life, through a movement of local Jesus-centred churches"
const playThisWeekTeachingText="Here's this weeks teaching:"

const Alexa = require('ask-sdk-core');
var xml2js = require('xml2js');
const https = require('https');
var parser = new xml2js.Parser();

parser.on('error', function(err) { console.log('Parser error', err); });

const podcastFeedURL="https://media.themeetinghouse.com/podcast/TMH.rss"
const get = async (url) => {
    return new Promise((resolve, reject) => {
        var data = '';
        https.get(url, function(res) {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                res.on('data', function(data_) { data += data_.toString(); });
                res.on('end', function() {
                    //console.log('data', data);
                    parser.parseString(data, function(err, result) {
                     //   console.log('FINISHED', err, result);
                        resolve(result);
                    });
                });
            }
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            reject(e);
        });
    });
};
async function ProcessJSON(response){
    var podcast=await get(podcastFeedURL);




    console.log("item:", podcast.rss.channel[0].item[0].enclosure[0].$.url);
    var podcastURL= podcast.rss.channel[0].item[0].enclosure[0].$.url;
    const speechText = playThisWeekTeachingText;

    return response.responseBuilder
      .speak(speechText)
      .withSimpleCard("Current Teaching", speechText)
      .speak(speechText)
      .addDirective({
            'type': 'AudioPlayer.Play',
            'playBehavior': 'REPLACE_ALL',
            'audioItem': {
                'stream': {
                    'streamFormat': "AUDIO_MPEG",
                    'token': podcastURL,
                    'url': podcastURL,
                    'offsetInMilliseconds': 0
                }
            }
        })
      .getResponse();
 }

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to The Meeting House, you can ask to play the latest teaching or ask for help!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('The Meeting House', speechText)
      .getResponse();
  },
};
const PlayThisWeeksTeachingIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PlayThisWeeksTeachingIntent';
  },
  handle(handlerInput) {
    console.log('IN PlayThisWeeksTeachingIntent');

    return ProcessJSON(handlerInput);

  },
};
//
const ValuesStatementIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ValuesStatementIntent';
  },
  handle(handlerInput) {
    const speechText = valuesText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Values", speechText)
      .getResponse();
  },
};
const PurposeStatementIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PurposeStatementIntent';
  },
  handle(handlerInput) {
    const speechText = purposeText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Purpose", speechText)
      .getResponse();
  },
};

const VisionStatementIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'VisionStatementIntent';
  },
  handle(handlerInput) {
    const speechText = visionText;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Vision", speechText)
      .getResponse();
  },
};
/*
const JokeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'JokeIntent';
  },
  handle(handlerInput) {
    const speechText = "Here's a joke";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Jokes!!", speechText)
      .getResponse();
  },
};
*/


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    //const speechText = 'You can ask me to play the latest teaching, tell a joke, or ask ask about our vision, values or purpose!';
    const speechText = 'You can ask me to play the latest teaching, or ask ask about our vision, values or purpose!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Help', speechText)
      .getResponse();
  },
};



const NavigateHomeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NavigateHomeIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Goodbye!', speechText)
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
  //  PauseIntentHandler,
  //  ResumeIntentHandler,
    NavigateHomeIntentHandler,
  // JokeIntentHandler,
    LaunchRequestHandler,
    PlayThisWeeksTeachingIntentHandler,
    VisionStatementIntentHandler,
    PurposeStatementIntentHandler,
    ValuesStatementIntentHandler,
    HelpIntentHandler,
    //CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
