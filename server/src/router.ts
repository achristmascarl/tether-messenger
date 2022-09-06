const Router = require('express').Router;
import camelCase from 'camelcase';

import tokenGenerator from './tokenGenerator';
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

router.get('/config', (req, res) => {
  res.json(config);
});

export default router;
