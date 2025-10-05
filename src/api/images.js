export const uploadImage = async (file) => {
  console.log(file)
  console.log(`url: ${import.meta.env.VITE_BACKEND_URL}/image/upload`)
  let formData = new FormData()
  // formData.append('file', file)
  formData.append('image', file)
  fetch(`${import.meta.env.VITE_BACKEND_URL}/image/upload`, {
    method: 'POST',
    body: formData,
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.errors) {
        alert(data.errors)
      } else {
        console.log('returned data')
        console.log(data)
        return data
      }
    })
  // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image/upload`, {
  //   method: 'POST',
  //   body: file,
  // })
  // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image/upload`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'multipart/form-data', filename: file.name },
  //   body: file,
  // })
  // // const formData = new FormData()
  // // formData.append('file', file)
  // // // formData.append('upload_preset', 'docs_upload_example_us_preset')

  // // const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image/upload`, {
  // //   method: 'POST',
  // //   headers: { 'Content-Type': 'multipart/form-data' },
  // //   body: formData,
  // // })
  // // // const res = await fetch(
  // // //   'https://api.cloudinary.com/v1_1/dw7kpbs2t/image/upload',
  // // //   {
  // // //     method: 'POST',
  // // //     body: formData,
  // // //   },
  // // // )
  // if (!res.ok) {
  //   // throw new Error('failed to upload image!')
  //   throw new Error(`failed: ${res.error}`)
  // }
  // return await res.json()
}
