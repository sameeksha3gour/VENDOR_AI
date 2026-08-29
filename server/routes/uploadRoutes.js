router.post(
    "/upload",
    protect,
    upload.single("invoice"),//multer stores uploaded file and make it available as requested file
    
    (req, res) => {

        res.status(200).json({

            success: true,

            message: "Invoice Uploaded Successfully",

            file: req.file,

        });

    }
);