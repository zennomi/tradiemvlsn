const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    student_id: Number,
    test_id: Number,
    answers: [Boolean],
    name: String,
    shift: Number,
    school: String,
    dob: String,
    room: Number,
    mark: Number
})

resultSchema.methods.getTrueAnswers = function() {
    return this.answers.filter(x => x).length;
}

resultSchema.methods.getDate = function() {
    if (this.shift == 1 || this.shift == 2) return ("30/03/2021");
    return ("31/03/2021");
}

resultSchema.methods.getTime = function() {
    if (this.shift == 1 || this.shift == 3) return ("15h15 - 16h05");
    return ("18h30 - 19h20");
}

const Student = mongoose.model('MockTest 1 Student', resultSchema);

module.exports = Student;