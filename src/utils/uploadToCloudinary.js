import cloudinary from 'cloudinary';
import * as fs from 'fs/promises';
// cloudinary.v2.config({
//   secure: true,
//   cloud_name: 'dpvvi0lxt',
//   api_key: '756815951145185',
//   api_secret: 'CUXZnMqYaqndyAghLzvEwXBO-ks',
// });
cloudinary.v2.config({
  secure: true,
  cloud_name: 'dpvvi0lxt',
  api_key: '756815951145185',
  api_secret: 'CUXZnMqYaqndyAghLzvEwXBO-ks',
});

export const uploadToCloudinary = async (filePath) => {
  const response = await cloudinary.v2.uploader.upload(filePath);

  await fs.unlink(filePath);

  return response.secure_url;
};
