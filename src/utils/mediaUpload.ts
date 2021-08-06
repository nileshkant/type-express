import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { BadRequestError } from '../common/errorValidation/errors';

// cloudinary configuration setup here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const streamUpload = (req) => {
  // convert single file to array
  const filesToUpload = req.file ? [{ ...req.file }] : req.files;

  // check if there are any files
  if (!filesToUpload) throw new BadRequestError('No files to upload');

  // upload using streamifier
  const stream = filesToUpload.map((file) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        // upload media options here
        { folder: req.user?.id || '/admin', exif: true, gps: true },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  });
  return Promise.all(stream)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
