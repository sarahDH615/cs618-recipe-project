export const uploadImage = async (token, file) => {
  // console.log(file)
  // console.log(`url: ${import.meta.env.VITE_BACKEND_URL}/image/upload`)
  let formData = new FormData()
  // formData.append('image', file) // arg[0] is the name multer may look under
  formData.append('file', file) // arg[0] for front end sides, need to specify file
  formData.append('upload_preset', 'ml_default')
  const url = 'https://api.cloudinary.com/v1_1/dw7kpbs2t/image/upload'

  const res = await fetch(url, {
    // mode: 'no-cors',
    method: 'POST',
    body: formData,
  })
  // .then((response) => {
  //   return response.text()
  // })
  // .then((data) => {
  //   document.getElementById('data').innerHTML += data
  // })
  // console.log(res)
  // console.log(res.text())

  if (!res.ok) {
    throw new Error(`failed to upload image!: ${res}`)
  }
  const resJson = await res.json()
  return { image_id: resJson.public_id, image_url: resJson.secure_url }
  // console.log(resjson)
  // return await res.json()
  // return res

  // const res = await fetch(
  //   'https://api.cloudinary.com/v1_1/dw7kpbs2t/image/upload',
  //   {
  //     method: 'POST',
  //     // credentials: 'include',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     // credentials: 'omit', // having this in caused a 401
  //     body: formData,
  //   },
  // )

  // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image/upload`, {
  //   method: 'POST',
  //   // credentials: 'include',
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   // credentials: 'omit', // having this in caused a 401
  //   body: formData,
  // })
  // if (!res.ok) {
  //   throw new Error('failed to upload image!')
  // }
  // return await res.json()
}
