var multer = require('multer');
var uploadFileMid = require('../middlewares/upload.file.middleware');

module.exports={
     uploadFile:function(req,res){
        var upload = multer({
                    storage: uploadFileMid.files.storage(), 
                    fileFilter:uploadFileMid.files.fileFilter 
                    }).single('image');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           }else{
            res.send(`/${req.file.path}`);
           }         
        })       
     }
}