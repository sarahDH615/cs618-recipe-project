import { Image } from '../db/models/image.js'
import { cloudinaryConn } from '../middleware/cloudinary.js'

// console.log(cloudinaryConn.config()) // temp only
// example result
// {
//   asset_id: '1490a5d78bf9ad2ad367332e8df2fdd9',
//   public_id: 'nydu8j1ttz8iw5mz53fx',
//   version: 1759609692,
//   version_id: 'dd69668f729cacc2b8cc5dea23cd934a',
//   signature: 'd2cd8dbe9e1012223c36984720084544af2cb6ce',
//   width: 1920,
//   height: 1279,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2025-10-04T20:28:12Z',
//   tags: [],
//   bytes: 305948,
//   type: 'upload',
//   etag: 'a05e4b2dead1465657e9cfc0ab1de643',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dw7kpbs2t/image/upload/v1759609692/nydu8j1ttz8iw5mz53fx.jpg',
//   secure_url: 'https://res.cloudinary.com/dw7kpbs2t/image/upload/v1759609692/nydu8j1ttz8iw5mz53fx.jpg',
//   asset_folder: '',
//   display_name: 'nydu8j1ttz8iw5mz53fx',
//   original_filename: 'happy_people',
//   api_key: '267743342695641'
// }

export async function uploadImage({ image_url }) {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  }

  try {
    // Upload the image
    const result = await cloudinaryConn.uploader.upload(image_url, options)
    console.log(result)
    // return await result
    const image = new Image({
      image_id: result.public_id,
      image_url: result.secure_url,
    })
    return await image.save()
  } catch (error) {
    console.error(error)
  }
}

// /////////////////////////////////////
// // Gets details of an uploaded image
// /////////////////////////////////////
// // const getAssetInfo = async (publicId) => {
// //   // Return colors in the response
// //   const options = {
// //     colors: true,
// //   }

// //   try {
// //     // Get details about the asset
// //     const result = await cloudinary.api.resource(publicId, options)
// //     console.log(result)
// //     return result
// //   } catch (error) {
// //     console.error(error)
// //   }
// // }

// const createImageTag = (publicId) => {
//   // Create an image tag with transformations applied to the src URL
//   // To return only the URL, and not the whole tag, replace cloudinary.image with cloudinary.url
//   let imageTag = cloudinary.image(publicId, {
//     transformation: [
//       { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//       { radius: 'max' },
//     ],
//   })

//   return imageTag
// }

// //////////////////
// //
// // Main function
// //
// //////////////////
// ;(async () => {
//   // Set the image to upload
//   const imagePath =
//     'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg'

//   // Upload the image
//   const publicId = await uploadImage(imagePath)

//   // Create an image tag, using two of the colors in a transformation
//   const imageTag = await createImageTag(publicId)

//   // Log the image tag to the console
//   console.log(imageTag)

//   // Get the colors in the image
//   //   const colors = await getAssetInfo(publicId)
// })()
// <img src='https://res.cloudinary.com/dw7kpbs2t/image/upload/c_thumb,g_faces,h_250,w_250/r_max/nydu8j1ttz8iw5mz53fx?_a=BAMAK+a60' />
