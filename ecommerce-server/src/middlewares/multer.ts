import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "src/uploads");
  },
  filename(req, file, callback) {
    const id = uuid();
    const newName = file.originalname.split(".").pop();
    callback(null, `${id}.${newName}`);
  },
});

export const singleUpload = multer({ storage }).single("photo");
