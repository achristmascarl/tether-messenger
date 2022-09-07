import { Router } from 'express';
// import camelCase from 'camelcase';

import tokenGenerator from './twilio/tokenGenerator';
import conversationConnector from './twilio/conversationConnector';

const router = new Router();

// Convert keys to camelCase to conform with 
// the twilio-node api definition contract
// function camelCaseKeys(hashmap) {
//   const newhashmap = {};
//   Object.keys(hashmap).forEach(function(key) {
//     const newkey = camelCase(key);
//     newhashmap[newkey] = hashmap[key];
//   });
//   return newhashmap;
// }

router.get('/token/:id?', (req, res, next) => {
  const id = req.params.id;
  try {
    res.send(tokenGenerator(id));
  } catch (err) {
    next(err);
  }
});

router.post('/token', (req, res, next) => {
  const id = req.body.id;
  try {
    res.send(tokenGenerator(id));
  } catch (err) {
    next(err);
  }
});

router.post('/conversations/connect', async (req, res, next) => {
  const userId: string = req.body.userId;
  const recipientId: string = req.body.recipientId;
  try {
    res.send(await conversationConnector(userId, recipientId));
  } catch (err) {
    next(err);
  }
});

export default router;
