import {
  listAllRecipes,
  listRecipesByTitle,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js'

export function recipesRoutes(app) {
  // get all recipes
  app.get('/api/v1/recipes', async (req, res) => {
    const { sortBy, sortOrder, title } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (title) {
        return res.json(await listRecipesByTitle(title, options))
      } else {
        return res.json(await listAllRecipes(options))
      }
    } catch (err) {
      console.error('error listing recipes: ', err)
      return res.status(500).end()
    }
  })
  // get one recipe
  app.get('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params
    try {
      const recipe = await getRecipeById(id)
      if (recipe === null) {
        return res.status(404).end()
      }
      return res.json(recipe)
    } catch (err) {
      console.error('error getting recipe by id: ', err)
      return res.status(500).end()
    }
  })
  // create a recipe
  app.post('/api/v1/recipes', async (req, res) => {
    try {
      const recipe = await createRecipe(req.body)
      return res.json(recipe)
    } catch (err) {
      console.error('error creating recipe: ', err)
      return res.status(500).end()
    }
  })
  // update a recipe
  app.patch('/api/v1/recipes/:id', async (req, res) => {
    try {
      const recipe = await updateRecipe(req.params.id, req.body)
      return res.json(recipe)
    } catch (err) {
      console.error('error updating recipe: ', err)
      return res.status(500).end()
    }
  })
  // delete a recipe
  app.delete('/api/v1/recipes/:id', async (req, res) => {
    try {
      const { deletedCount } = await deleteRecipe(req.params.id)
      if (deletedCount === 0) {
        return res.sendStatus(404)
      }
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting recipe: ', err)
      return res.status(500).end()
    }
  })
}
