export const uploadImage = async (token, file) => {
  let formData = new FormData()
  formData.append('file', file) // arg[0] for front end sides, need to specify file
  formData.append('upload_preset', 'ml_default')
  const url = 'https://api.cloudinary.com/v1_1/dw7kpbs2t/image/upload'

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error(`failed to upload image!: ${res}`)
  }
  const resJson = await res.json()
  return { image_id: resJson.public_id, image_url: resJson.secure_url }
}

// export const deleteImage = async (token, file) => {
//   let formData = new FormData()
//   formData.append('file', file) // arg[0] for front end sides, need to specify file
//   formData.append('upload_preset', 'ml_default')
//   const url = 'https://api.cloudinary.com/v1_1/dw7kpbs2t/image/upload'

//   const res = await fetch(url, {
//     method: 'POST',
//     body: formData,
//   })

//   cloudinary.v2.uploader.destroy(imageData.public_id, function(error,result) {
//         console.log(result, error) })
//         .then(resp => console.log(resp))
//         .catch(_err=> console.log("Something went wrong, please try again later."));
//   }

//   if (!res.ok) {
//     throw new Error(`failed to upload image!: ${res}`)
//   }
//   const resJson = await res.json()
//   return { image_id: resJson.public_id, image_url: resJson.secure_url }
// }
