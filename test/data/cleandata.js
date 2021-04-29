'use strict';

const fs = require("fs");

let index = 4;

fs.readFile(`./data/tnmaker-${index}.json`,'utf8', (err, rawdata) => {
    if (err) throw err;
    rawdata = rawdata.toString().slice(1);
    let table = JSON.parse(rawdata)["Thống kê"];
    let result = [];
    for (let i = 0; i < table.length; i += 4) {
        if (table[i + 2]["CÂU"] != "KẾT QUẢ") {
            console.log("Error");
            break;
        };
        let std = { sbd: 0, testid: 0, answers: [] };
        std.sbd = Number(table[i]["SỐ BÁO DANH"]);
        std.testid = Number(table[i]["MÃ ĐỀ"]);
        for (let j = 0; j < 40; j++) {
            let answer = table[i + 2][(j+1).toString()];
            if (answer == "Đ") answer = true;
            else answer = false;
            std.answers[j] = answer;
        }
        result.push(std);
    }
    console.log(result);
    fs.writeFileSync(`cleandata-${index}.json`, JSON.stringify(result));
});

