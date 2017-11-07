var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = {
	title: {type: String, required: true},
	description: { type: String},
	type: {type: String, enum: ['Action', 'Follow-up'], default:'Action'},
	eta: {type: Date , default: Date.now},
	tags: [{type: String, maxlength: 150}],
	attachements: [{type: String}],
	user: {type: mongoose.Schema.Types.ObjectId},
    status: { type: String, ref: 'Status'}
}

var schema = new mongoose.Schema(todoSchema);

module.exports = 
module.exports.todoSchema = todoSchema;