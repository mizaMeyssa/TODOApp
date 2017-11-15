var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = {
	title: {type: String, required: true},
	description: { type: String},
	type: {type: String, enum: ['Action', 'Follow-up'], required: true, default:'Action'},
	type: {type: String, ref: 'Action'},
	eta: {type: Date , required: true, default: Date.now},
	tags: [{type: String, maxlength: 150}],
	attachements: [{type: String}],
	user: {type: mongoose.Schema.Types.ObjectId},
	creationDate: {type: Date, required: true , default: Date.now},
    status: { type: String, ref: 'Type'}
}

var schema = new mongoose.Schema(todoSchema);

module.exports = 
module.exports.todoSchema = todoSchema;