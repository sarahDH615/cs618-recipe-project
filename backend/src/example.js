import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'

await initDatabase() // async

const recipe = new Recipe({
  title: 'nut cake',
  ingredients: ['6 eggs', 'flour', 'almonds', 'sugar', 'crushed biscuits'],
})
const createdRecipe = await recipe.save() // save the recipe in the db and to a variable
console.log(createdRecipe)

// await Recipe.findByIdAndUpdate(createdRecipe._id, {
//   $set: { title: 'Cinnamon oatmeal' },
// })

const recipes = await Recipe.find() // return all Recipe instances
console.log(recipes)
