import multer from "multer";
import path from 'path'
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: "src/uploads",
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  dest: "src/uploads",
  limits: { fileSize: 2000000 },
 
});

export default upload;
