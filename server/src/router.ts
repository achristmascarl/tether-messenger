const Router = require('express').Router;
import camelCase from 'camelcase';

import { registerBind, sendNotification } from './notification_handler';
import tokenGenerator from './token_generator';
import config from './config';

const router = new Router();

// Convert keys to camelCase to conform with the twilio-node api definition contract
function camelCaseKeys(hashmap) {
  let newhashmap = {};
  Object.keys(hashmap).forEach(function(key) {
    // @ts-ignore: ts incompatibility in dependency module
    let newkey = camelCase(key);
    newhashmap[newkey] = hashmap[key];
  });
  return newhashmap;
};

router.get('/token/:id?', (req, res) => {
  const id = req.params.id;
  res.send(tokenGenerator(id));
});

router.post('/token', (req, res) => {
  const id = req.body.id;
  res.send(tokenGenerator(id));
});

router.post('/register', (req, res) => {
  let content = camelCaseKeys(req.body);
  registerBind(content).then((data) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(data.status);
    res.send(data.data);
  });
});

router.post('/send-notification', (req, res) => {
  let content = camelCaseKeys(req.body);
  sendNotification(content).then((data) => {
    res.status(data.status);
    res.send(data.data);
  });
});

router.get('/config', (req, res) => {
  res.json(config);
});


//Create a facebook-messenger binding based on the authentication webhook from Facebook
router.post('/messenger_auth', function(req, res) {
  //Extract the request received from Facebook
  const message = req.body.entry[0].messaging[0];
  console.log(message);
  // Set user identity using their fb messenger user id
  const identity = message.sender.id;
  //Let's create a new facebook-messenger Binding for our user
  const binding = {
    "identity":identity,
    "BindingType":'facebook-messenger',
    "Address":message.sender.id
  };
  registerBind(camelCaseKeys(binding)).then((data) => {
    res.status(data.status);
    res.send(data.data);
  });
});

//Verification endpoint for Facebook needed to register a webhook.
router.get('/messenger_auth', function(req, res) {
  console.log(req.query["hub.challenge"]);
  res.send(req.query["hub.challenge"]);
});

export default router;
