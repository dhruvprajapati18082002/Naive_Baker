const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../public/images'));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + path.extname(file.originalname);
        cb(null, name);
        req.filename = `/public/images/${name}`;
    }
});

const uploadimage = multer({storage: storage});

module.exports = uploadimage
