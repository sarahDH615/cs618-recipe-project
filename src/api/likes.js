export const getLikes = async (id) => {
  console.log(`get likes request with id: ${id}`)
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/likes/${id}`)
  const resp = await res.json()
  console.log(`resp from get likes: ${resp}`)
  return resp
  // return await res.json()
}

export const checkIfLiked = async (id, userid) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/likes/${id}/${userid}`,
  )
  const isLiked = await res.json()
  console.log(`is liked: ${Boolean(isLiked)}`)
  return Boolean(isLiked)
  // return await res.json()
}

export const removeLike = async (token, id) => {
  console.log(
    `remove like endpoint: ${import.meta.env.VITE_BACKEND_URL}/likes/${id}`,
  )
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/likes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(res)
  return await res.json()
}

export const addLike = async (token, id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/likes/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return await res.json()
}
