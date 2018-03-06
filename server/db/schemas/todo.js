var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = {
	title: {type: String, required: true},
	description: { type: String},
	type: {type: String, ref: 'Type'},
	eta: {type: Date , required: true, default: Date.now},
	creationDate: {type: Date, required: true , default: Date.now},
	closureDate: {type: Date},
	tags: [{type: String, maxlength: 150}],
	attachements: [{type: String}],
	user: {type: mongoose.Schema.Types.ObjectId},
    status: { type: String, ref: 'Status'},
    important: { type: Boolean, default: false}
}

var schema = new mongoose.Schema(todoSchema);

module.exports = 
module.exports.todoSchema = todoSchema;