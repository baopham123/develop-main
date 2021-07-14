const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/avatar',
    filename: function(req, file, cb){
      cb(null,req.session.userId + path.extname(file.originalname));
    }
  });

const uploadAvatar = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
    });


    function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Lỗi: Đinh dạng hình ảnh không phù hợp!');
    }
    }

module.exports = uploadAvatar;