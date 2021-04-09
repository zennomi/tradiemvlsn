require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT ? process.env.PORT : 8080;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Student = require('./models/mocktest_1_student');
const Test = require('./models/mocktest_1_test');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to MongoDB Atlas.');
}).catch((err) => {
    console.log('Error occurred connecting to MongoDB Atlas');
});

app.get('/', async (req, res) => {
    let topStudents;
    try {
        topStudents = await Student.find({}).sort({"mark": -1}).limit(10);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
    res.render('index', {topStudents});
})

app.get('/viewresult', async (req, res) => {
    let student, test;
    try {
        student = await Student.findOne({student_id: req.query.id});
        if (!student) throw ("Not Found Student.");
        test = await Test.findOne({test_id: student.test_id});
        student.topic = {};
        student.answers.forEach((a,i) => {
            let ques = test.questions[i]
            student.topic[ques.topic] = student.topic[ques.topic] || {total: 0, count: 0};
            student.topic[ques.topic].total += ques.level;
            if (a) {
                student.topic[ques.topic].count += ques.level;
            }
            // else {
            //     student.topic[ques.topic] = student.topic[ques.topic] || {total: 0, total: 0};
            //     student.topic[ques.topic].count -= ques.level;
            //     student.topic[ques.topic].total ++;
            // }
        })
        console.log(student.topic);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
    res.render('result', {student});
})

app.get('/api/:studentid', async (req, res) => {
    let student;
    try {
        student = await Student.findOne({student_id: req.params.studentid});
        if (!student) throw ("Not Found Student.");
        test = await Test.findOne({test_id: student.test_id});
        student.topic = {};
        student.answers.forEach((a,i) => {
            let ques = test.questions[i]
            student.topic[ques.topic] = student.topic[ques.topic] || {total: 0, count: 0};
            student.topic[ques.topic].total += ques.level;
            if (a) {
                student.topic[ques.topic].count += ques.level;
            }
            // else {
            //     student.topic[ques.topic] = student.topic[ques.topic] || {total: 0, total: 0};
            //     student.topic[ques.topic].count -= ques.level;
            //     student.topic[ques.topic].total ++;
            // }
        })
        console.log(student.topic);
    } catch (err) {
        console.log(err);
        res.json({status: 201});
    }
    res.json({status: 200, topicData: student.topic});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});