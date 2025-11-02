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

export const updateRecipe = async (token, id, recipe) => {
  console.log('attepting recipe update')
  recipe.ingredients = await splitIngredients(recipe.ingredients)
  console.log(`after ingredients update: ${recipe.ingredients}`)
  console.log(`string of recipe: ${JSON.stringify(recipe)}`)
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  })
  return await res.json()
}

export const createRecipe = async (token, recipe) => {
  recipe.ingredients = await splitIngredients(recipe.ingredients)
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

const splitIngredients = async (ingredients) => {
  if (ingredients instanceof String) {
    console.log('ingredients are an string, splitting on \\n')
    return ingredients.split('\n')
  } else if (ingredients instanceof Object) {
    console.log('ingredients are an object, getting values from it')
    // return Array.from(Object.values(ingredients))
    return Object.values(ingredients)
  }
  return ingredients
}
