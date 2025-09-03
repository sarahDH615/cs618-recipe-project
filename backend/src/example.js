import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'

await initDatabase() // async

const recipe = new Recipe({
  title: 'Cinnamon oats',
  ingredients: ['oats', 'cinnamon'],
})
const createdRecipe = await recipe.save() // save the recipe in the db and to a variable

await Recipe.findByIdAndUpdate(createdRecipe._id, {
  $set: { title: 'Cinnamon oatmeal' },
})

const recipes = await Recipe.find() // return all Post instances
console.log(recipes)
