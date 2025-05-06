import multer from "multer";
import path from "path";

const tempDir = path.join(process.cwd(), "temp"); // or use your own path

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
