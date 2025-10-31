export const getRecipes = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const getRecipeById = async (recipeId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}`,
  )
  return await res.json()
}

export const deleteRecipe = async (token, id) => {
  console.log(
    `delete endpoint: ${import.meta.env.VITE_BACKEND_URL}/recipes/${id}`,
  )
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: id }),
  })
  console.log(res)
  return await res.json()
}

export const updateRecipe = async (token, recipe) => {
  console.log(`recipe being updated: ${recipe}`)
  recipe.ingredients = recipe.ingredients.split('\n')
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipe.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
    },
  )
  return await res.json()
}

export const createRecipe = async (token, recipe) => {
  recipe.ingredients = recipe.ingredients.split('\n')
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  })
  return await res.json()
}
