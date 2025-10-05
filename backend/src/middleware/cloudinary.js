import dotenv from 'dotenv'
import * as cloudinary from 'cloudinary'

dotenv.config() // allow env var access

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export const cloudinaryConn = cloudinary

// export const cloudinaryConn = cloudinary.config({
//   secure: true,
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// })
