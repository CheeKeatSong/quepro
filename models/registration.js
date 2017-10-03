// var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// var jQuery = require('jquery');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

var userId;
var method = Registration.prototype;

function Registration(firstName, lastName, email, password, mobileNumber, verificationCode){
   this.userId = userId;
   this.firstName = firstName;
   this.lastName = lastName;
   this.email = email;
   this.password = password;
   this.mobileNumber = mobileNumber;
   // this.verificationCode = verificationCode;
}

// method.getUserId = function(){
//    return this.userId;
// }

// method.setUserId = function(userId){
//    this.userId = userId;
// }

method.getFirstName = function(){
	return this.firstName;
}

method.setFirstName = function(firstName){
	this.firstName = firstName;
}

method.getLastName = function(){
	return this.lastName;
}

method.setLastName = function(lastName){
	this.lastName = lastName;
}

method.getEmail = function(){
	return this.email;
}

method.setEmail = function(email){
	this.email = email;
}

method.getPassword = function(){
	return this.password;
}

method.setPassword = function(password){
	this.password = password;
}

method.getMobileNumber = function(){
	return this.mobileNumber;
}

method.setMobileNumber = function(mobileNumber){
	this.mobileNumber = mobileNumber;
}

// method.getVerificationCode = function(){
//    return this.verificationCode;
// }

// method.setVerificationCode = function(verificationCode){
//    this.verificationCode = verificationCode;
// }

module.exports = Registration;

module.exports.createUser = function(newUser, callback){

	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			request.post(
				'https://rest-quepro.herokuapp.com/api/registration',
				{ json: { firstName : newUser.firstName, lastName : newUser.lastName, email : newUser.email, password : newUser.password, mobileNumber : newUser.mobileNumber } },
				function (error, response, body) {
					if (!error && response.statusCode == 200) {
						console.log(body.data.userid);  
						userId = body.data.userid;

						request.get(
							"https://rest-quepro.herokuapp.com/api/resendSMSCode/" + id,
							function (error, response, body) {
								if (!error && response.statusCode == 200) {
									console.log(body)
								}
							}
							);

					}
				}
				);
		});
	});
}

module.exports.retrieveId = function(){
	return userId;
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}