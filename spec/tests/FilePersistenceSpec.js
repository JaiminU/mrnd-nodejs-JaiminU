
var getContactFileName = function(id) {

	// We assume contacts are stored under data sub-folder
	return "src\\contacts\\data\\" + id + "-Contact.json";
};

var getContactMessageFileName = function(id) {

	// We assume contacts are stored under data sub-folder
	return "src\\contacts\\data\\" + id + "-Messages.json";
};

describe("FilePersistence Test Suite", function(){

	//var request = require('request');
	var request = require('C:/Program Files/nodejs/node_modules/npm/node_modules/request');
	var base_url = "http://localhost:3000";
	var contacts_url = base_url + "/contacts";
	var fs = require('fs');

	var idCreated;

	describe("create persist contact", function(){

		it("should create contact",function(done){

			var contact = {};
			contact.firstName = "jagan";
			contact.lastName = "peri";
			contact.phone = "23002300";

			console.log(JSON.stringify(contact));

		    request.post({url: contacts_url,
		    			  body: contact,
		    			  json: true
		    			},
		    		    function(error, response, body){

							expect(response.statusCode).toBe(200);
							console.log(body);
							idCreated = body;
							done();
					    });
		});

		it("should persist contact",function(done){

			var fileName = getContactFileName(idCreated);

			var obj = JSON.parse(fs.readFileSync(fileName));

			expect(obj.firstName).toBe("jagan");
			done();

		});

		it("should update contact",function(done){

			var updatedContact = {};
			updatedContact.firstName = "jagan-updated";
			request.put({
							url: contacts_url + "/" + idCreated,
							body: updatedContact,
							json: true
						},
		    		    function(error, response, body){

							expect(response.statusCode).toBe(200);
							console.log(body);

							var fileName = getContactFileName(idCreated);

							var obj = JSON.parse(fs.readFileSync(fileName));
							expect(obj.firstName).toBe("jagan-updated");
							done();
					    });
		});
	});

	//TODO: Fill out the test case below that posts a message to a contact
	// and retrieves it back.
	describe("post and get message to contact", function(){
		var msgCreated;
		it("should post message to contact", function(done){
			var message = {};
			message.sender = 0;
			message.txt = "This is a message to contact 0";
			request.post({url: contacts_url + "/" + idCreated + "/message/",
							body: message,
							json: true
						},
							function(error, response, body){

						expect(response.statusCode).toBe(200);
						console.log(body);
						msgCreated = body;
						done();
			});
		});

		it("should persist message",function(done){

			var fileName = getContactMessageFileName(idCreated);

			var obj = JSON.parse(fs.readFileSync(fileName));

			expect(obj[msgCreated].sender).toBe(0);
			done();

		});

		it("should get message for contact", function(done){
			request.get({
							url: contacts_url + "/" + idCreated +"/message/" + msgCreated,
							json: true
						},
								function(error, response, body){

							expect(response.statusCode).toBe(200);
							console.log(body);
							expect(body.sender).toBe(0);
							done();
						});
		});

	});

});
