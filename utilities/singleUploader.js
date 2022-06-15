const { path } = require("express/lib/application");
const createError = require("http-errors");
const multer = require("multer");

function uploader(
    subfolder_path,
    allowrd_file_types,
    max_file_size,
    error_msg
){
    // file upload folder
    const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

    // define th storage 
    const storage = multer.diskStorage({
        destination:(req,res,cb)=>{
            cb(null,UPLOAD_FOLDER);
        },
        filename:(req,file,cb)=>{
            const fileExt = path.extname(file.originalname);
            const filename= file.originalname
                                .replace(fileExt,"")
                                .toLowerCase()
                                .split(" ")
                                .join("-") +
                                "-" +
                                Date.now();

                                cb(null,filename + fileExt);
        }
    });
            // prepare the final multer upload object

            const upload = multer({
                storage:storage,
                limits:{
                    fileSize: max_file_size,
                },
                fileFilter:(req,file,cb)=>{
                    if(allowrd_file_types.includes(file.mimetype)){
                        cb(null,true);
                    }else{
                        cb(createError(error_msg));
                    }
                }
            })

    return upplad
}

module.exports = uploader;