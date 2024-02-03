const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        const fileName = path.parse(file.originalname).name;
        cb(null, fileName + `-user${req.cookies.user_id}` + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload