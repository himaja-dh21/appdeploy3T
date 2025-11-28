let multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.file)
    cb(null, 'profilePics')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

module.exports = upload;