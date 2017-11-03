var mongoose = require('mongoose');

var todoSchema = {
	title: {type: String, required: true},
	description: { type: String},
	type: {type: String, enum: ['Action', 'Follow-up']},
	eta: {type: Date},
	tags: [{type: String, maxlength: 150}],
	attachements: [{type: String}],
	user: {type: mongoose.Schema.Types.ObjectId}
}

var schema = new mongoose.Schema(todoSchema);

module.exports = 
module.exports.todoSchema = todoSchema;