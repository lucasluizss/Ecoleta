import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		filename(_, file, callback) {
			const hash = crypto.randomBytes(6).toString('hex');

			const fileName = `${hash}-${file.originalname}`;

			callback(null, fileName);
		}
	}),
	fileFilter: (_: any, file: any, callback: any) => {
		const imageExtensionRegex = /\.(jpg|jpeg|png)$/;

		const fileUploaded = file.originalname;

		if (!fileUploaded.match(imageExtensionRegex)) {
			const error = new Error('Only image files are allowed!');
			return callback(error);
		}

		callback(null, true);
	}
};