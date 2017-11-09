var mongoose = require('mongoose');

var typeSchema = {
	_id: {type: String, required: true, enum: ['action', 'followup']},
	label: { type: String, required: true, enum: ['Action', 'Follow-Up']}
}

var schema = new mongoose.Schema(typeSchema);

module.exports = 
module.exports.typeSchema = typeSchema;