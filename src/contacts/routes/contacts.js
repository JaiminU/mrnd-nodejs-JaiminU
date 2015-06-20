var express = require('express');
var fs = require('fs');
var router = express.Router();

var getContactCountFileName = function() {

	// We assume contacts are stored under data sub-folder
	return "data\\ContactCount.json";
};

var getContactFileName = function(id) {

	// We assume contacts are stored under data sub-folder
	return "data\\" + id + "-Contact.json";
};

var getContactMessageFileName = function(id) {

	// We assume contacts are stored under data sub-folder
	return "data\\" + id + "-Messages.json";
};

/* GET contacts */
router.get('/:id', function(req, res, next) {
  fs.readFile(getContactFileName(req.params.id), function(err,contact_json){
    if(err) throw err;
    var contact = JSON.parse(contact_json);
    res.json(contact);
  });
});

router.post('/', function(req, res, next) {
  //console.log("From contacts: " + req.body);
  var contact_json = JSON.stringify(req.body);
  var count_file = getContactCountFileName();
  fs.readFile(count_file,function(err,data){
    var count=0;
    if(err){
      if(err.code === 'ENOENT') {
        fs.writeFile(count_file, JSON.stringify(count),function(err){
          if(err) throw err;
        });
      }else{
        throw err;
      }
    }else{
      count = data;
    }
    var contact_file = getContactFileName(count);
    var message_file = getContactMessageFileName(count);
    var messages = [];
    fs.writeFile(contact_file,contact_json,function(err){
      if(err) throw err;
      fs.writeFile(message_file, JSON.stringify(messages), function(err){
        if(err) throw err;
        fs.writeFile(count_file, JSON.stringify(count++), function(err){
          if(err) throw err;
        });
        res.send('' + (count-1));
      });
    });
  });
});

router.put('/:id', function(req, res, next) {
  //console.log("Update: " + JSON.stringify(req.body));
  var id = req.params.id;
  var contact_file = getContactFileName(id);
  fs.readFile(contact_file, function(err,contact_json){
    if(err) throw err;
    var contact = JSON.parse(contact_json);
    for(var prop in req.body){
      contact[prop] = req.body[prop];
    }
    fs.writeFile(contact_file,JSON.stringify(contact),function(err){
      if(err)throw err;
    });
    res.json(contact);
  });
});

router.post('/:id/message', function(req,res,next){
  var id = req.params.id;
  var messages_file = getContactMessageFileName(id);
  fs.readFile(messages_file,function(err,messages_json){
    if(err) throw err;
    var messages = JSON.parse(messages_json);
    messages.push(req.body);
    fs.writeFile(messages_file,JSON.stringify(messages),function(err,data){
      if(err) throw err;
    });
    res.send('' + (messages.length - 1));
  });
});

router.get('/:id/message/:msg_id', function(req,res,next){
  var id = req.params.id;
  var msg_id = req.params.msg_id;
  var messages_file = getContactMessageFileName(id);
  fs.readFile(messages_file,function(err,messages_json){
      var messages = JSON.parse(messages_json);
      res.json(messages[msg_id]);
  });
});

module.exports = router;
