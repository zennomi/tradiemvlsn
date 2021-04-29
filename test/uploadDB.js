require('dotenv').config();

const fs = require("fs");
const mongoose = require('mongoose');

const Student = require('../models/mocktest_1_student');
const Test = require('../models/mocktest_1_test')

async function main() {
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

    // let rawdata = await fs.readFileSync("./test/data/studentdata.json");
    // rawdata = rawdata.toString().slice(1);
    // let students = JSON.parse(rawdata)["Students"];
    // await Student.insertMany(students.map(s => {
    //     return {
    //         student_id: s["SBD"],
    //         test_id: s["Mã đề"],
    //         name: s["Họ và tên"],
    //         shift: s["Ca thi"],
    //         school: s["Trường"],
    //         dob: s["Ngày sinh"],
    //         room: s["Phòng thi"],
    //         mark: s["Điểm"]
    //     }
    // }));

    let rawdata = await fs.readFileSync("./test/data/testdata.json");
    let data = JSON.parse(rawdata);
    let tests = [];
    for (let [id, questions] of Object.entries(data)) {
        tests.push({
            test_id: Number(id),
            questions: questions.map((q,i) => {
                return {
                    topic: q["Chủ để"] || "",
                    level: Number(q["Điểm"]) || Math.floor(i/4),
                    type: q["Dạng bài đặc trưng"] || "",
                    note: q["Tư vấn"] || ""
                }
            })
        })
    }
    console.log(JSON.stringify(tests));
    await Test.insertMany(tests);

    // let rawdata = await fs.readFileSync("./cleandata-1.json");
    // let data = JSON.parse(rawdata);
    // // console.log(data);
    // for (let i=0;i<data.length;i++) {
    //     await Student.updateOne({student_id: data[i].studentid}, {$set: {answers: data[i].answers, test_id: data[i].testid}});
    // }
    
    console.log("Done");
    return "Done";
}

main();
