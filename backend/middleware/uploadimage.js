const multer = require("multer");
const {v4 : uuidv4} = require('uuid');
var fs = require('fs');

const DIR = "./public/";

if (!fs.existsSync(DIR)){
    fs.mkdirSync(DIR);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = uuidv4() + "-" + file.originalname.toLowerCase().split(' ').join('-');
        req.fileName = fileName;
        cb(null, fileName);
    }
});

var upload = multer({
    storage: storage
});

module.exports = upload;