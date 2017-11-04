var mongoose = require('mongoose');

var todoSchema = {
	title: {type: String, required: true},
	description: { type: String},
	type: {type: String, enum: ['Action', 'Follow-up']},
	eta: {type: Date , default: Date.now},
	tags: [{type: String, maxlength: 150}],
	attachements: [{type: String}],
	user: {type: mongoose.Schema.Types.ObjectId},
	status: {type: String, enum: ['Pending', 'In Progress', 'Done'], default: 'In Progress'}
}

var schema = new mongoose.Schema(todoSchema);

module.exports = 
module.exports.todoSchema = todoSchema;