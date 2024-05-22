import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import {
  create,
  fetch,
  update,
  destroy,
} from "../app/controller/userController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "../storage/public/images/avatar/"),
      (error, success) => {
        if (error) throw error;
      }
    );
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;

    cb(null, filename, (error, success) => {
      if (error) throw error;
    });
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (/image\/(jpeg|jpg|png)/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only images are allowed!"));
  }
};

const route = express.Router();

const uploadAvatar = multer({
  storage: storageAvatar,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Example size limit: 2MB
});

route.get("/fetch", fetch);
route.post("/create", uploadAvatar.single("avatar"), create);
route.put("/update/:id", update);
route.delete("/destroy/:id", destroy);

export default route;
