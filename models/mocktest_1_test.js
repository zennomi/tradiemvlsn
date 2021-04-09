const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    topic: String,
    level: Number,
    type: String,
    note: String
})

const testSchema = new Schema({
    test_id: String,
    questions: [questionSchema]
})

const Test = mongoose.model('MockTest 1 Test', testSchema);

module.exports = Test;