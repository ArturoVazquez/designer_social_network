const multer = require ('multer');

const uploadFile = (folder) => {

  const storage = multer.diskStorage({
    destination: `public/images/${folder}`,
    filename: function(req, file, cb){
        let originalName = file.originalname;
        let newName = Date.now() + "-" + originalName;
        cb(null, newName)
    }
  })

  const upload = multer({storage: storage}).single("img");
  return upload;
  // por que en el metodo single de multer aparece img? pregunta proyecto mitad bootcamp sobre codigo
}

module.exports = uploadFile;