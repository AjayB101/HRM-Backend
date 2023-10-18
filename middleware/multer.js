const multer = require( 'multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'cloud')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'  || file.mimetype==='image/png' ){
        cb(null,true)
    }
    else{
        cb({message:'Unsupported File Format'},false)
    }
  }

  const upload = multer({ 
    storage: storage ,
    fileFilter:fileFilter,
    limits:{fileSize:10 * 1024 * 1024}
})

module.exports=upload