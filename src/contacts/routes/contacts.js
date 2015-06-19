var express = require('express');
var router = express.Router();
var contacts = [];

/* GET contacts */
router.get('/:id', function(req, res, next) {
  res.send(contacts[req.params.id]);
});

router.post('/', function(req, res, next) {
  //console.log("From contacts: " + req.body);
  req.body.messages = [];
  contacts.push(req.body);
  res.send('' + (contacts.length - 1));
});

router.put('/:id', function(req, res, next) {
  //console.log("Update: " + JSON.stringify(req.body));
  var id = req.params.id;
  for(var prop in req.body){
    contacts[id][prop] = req.body[prop];
  }
  res.json(contacts[id]);
});

router.post('/:id/message', function(req,res,next){
  var id = req.params.id;
  var msg_id = contacts[id].messages.length;
  contacts[id].messages[msg_id] = req.body;
  //console.log(contacts[id]);
  res.send('' + msg_id);
});

router.get('/:id/message/:msg_id', function(req,res,next){
  var id = req.params.id;
  var msg_id = req.params.msg_id;
  //console.log("Id: " + id + " Message Id: " + msg_id);
  res.json(contacts[id].messages[msg_id]);
});

module.exports = router;
