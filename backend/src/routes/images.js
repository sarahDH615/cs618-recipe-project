import { requireAuth } from '../middleware/jwt.js'
// import { cloudinaryConn } from '../middleware/cloudinary.js'
import multer from 'multer'
import { uploadImage } from '../services/images.js'

// Set up Multer for handling file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// console.log(cloudinaryConn.config()) // temp only

export function imageRoutes(app) {
  // app.post('/api/v1/recipes', requireAuth, async (req, res) => {
  //   try {
  //     const recipe = await createRecipe(req.auth.sub, req.body)
  //     return res.json(recipe)
  //   } catch (err) {
  //     console.error('error creating recipe: ', err)
  //     return res.status(500).end()
  //   }
  // })
  // app.post('/api/v1/image/upload', upload.single('image'), async (req, res) => {
  app.post(
    '/api/v1/image/upload',
    requireAuth,
    upload.single('image'),
    async (req, res) => {
      // const uploadResult = await new Promise((resolve, reject) => {
      //   cloudinaryConn.uploader
      //     .upload_stream((error, uploadResult) => {
      //       if (error) {
      //         return reject(error)
      //       }
      //       return resolve(uploadResult)
      //     })
      //     .end(req.file.buffer)
      // })
      // console.log(uploadResult)
      // return res.status(201).json({
      //   image_id: uploadResult.public_id,
      //   image_url: uploadResult.secure_url,
      // })
      // try {
      // const file = req.file
      // console.log('file')
      // console.log(file)

      // let content = req.file.buffer
      // console.log('buffer:')
      // console.log(content)

      try {
        // const image = await uploadImage(req.auth.sub, req.file.buffer)
        const image = await uploadImage(req.file.buffer)
        // return res
        //   .status(201)
        //   .json({ image_id: image.public_id, image_url: image.secure_url })
        return image
      } catch (err) {
        console.error('error uploading image: ', err)
        return res.status(500).end()
      }
      //   cloudinaryConn.uploader
      //     .upload_stream({ resource_type: 'auto' }, (error, result) => {
      //       if (error) {
      //         console.log(error)
      //   return res
      //     .status(500)
      //     .json({ error: 'Error uploading to Cloudinary' })
      // }
      //       console.log(result.public_id)
      //       return res.status(201).json({
      // image_id: result.public_id,
      // image_url: result.secure_url,
      //       })
      //     })
      //     .end(req.file.buffer)
      // } catch (err) {
      //   return res.status(400).json({
      //     error: 'Failed to upload the image!',
      //   })
      // }
    },
  )
}
