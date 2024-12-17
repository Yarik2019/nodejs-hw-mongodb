import path from 'node:path';

import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/constants';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('src', 'tmp'));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export { upload };
