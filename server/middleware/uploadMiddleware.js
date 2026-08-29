const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({

    destination: function (req, file, cb) {//store file inside uploads

        cb(null, "uploads/");

    },
//suppose u have upload file with some random name but it becomes numerical name to avoide overwritting
    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName +
            path.extname(file.originalname)
        );

    },

});

// File Filter only allow these 4 categories of
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(new Error("Only PDF and Images are allowed"));

    }

};

const upload = multer({

    storage,
    fileFilter,

});

module.exports = upload;