import { cloudinaryConn } from '../middleware/cloudinary.js'
import multer from 'multer'
// import { uploadImage } from '../services/images.js'

// Set up Multer for handling file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// console.log(cloudinaryConn.config()) // temp only

export function imageRoutes(app) {
  app.post('/api/v1/image/upload', upload.single('image'), async (req, res) => {
    try {
      const file = req.file
      console.log('file')
      console.log(file)

      // let content = req.body.get('file')
      let content = req.file.buffer
      console.log('buffer:')
      console.log(content)

      // const image = await uploadImage(req.body)
      // return res
      //   .status(201)
      //   .json({ image_id: image.public_id, image_url: image.secure_url })
      cloudinaryConn.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) {
            console.log(error)
            return res
              .status(500)
              .json({ error: 'Error uploading to Cloudinary' })
          }
          return res.status(201).json({
            image_id: result.public_id,
            image_url: result.secure_url,
          })
        })
        .end(req.file.buffer)
    } catch (err) {
      return res.status(400).json({
        error: 'Failed to upload the image!',
      })
    }
  })
}
