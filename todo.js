var mongoose = require('mongoose');
var User = require('./user.js')

var todoSchema = {
	title: {type: String, required: true},
	description: { type: String},
	type: {type: String, enum: ['Action', 'Follow-up']},
	eta: {type: Date},
	tags: [{type: String, maxlength: 150}],
	attachements: [{type: String}],
	user: User._id
}

module.exports = new mongoose.Schema(todoSchema);
module.exports.todoSchema = todoSchema;