var mongoose = require('mongoose');

var statusSchema = {
	_id: {type: String, required: true, enum: ['pending', 'inProgress', 'done']},
	label: { type: String, required: true, enum: ['Pending', 'In Progress', 'Done']}
}

var schema = new mongoose.Schema(statusSchema);

module.exports = 
module.exports.statusSchema = statusSchema;