const Tesseract = require("tesseract.js");

const extractText = async (imagePath) => {

    try {

        const { data } = await Tesseract.recognize(//text is getting recognized

            imagePath,

            "eng"

        );

        return data.text;

    }

    catch(error){

        throw error;

    }

}

module.exports = {

    extractText

};