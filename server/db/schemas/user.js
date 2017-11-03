var mongoose = require('mongoose');

var userSchema = {
	email: {type: String, required: true},
	login: { type: String, required: true},
	picture: {type: String, match: /^http:\/\//i},
}

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;