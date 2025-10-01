import mongoose from 'mongoose'
import { describe, expect, test, beforeEach, beforeAll } from '@jest/globals'
import { Recipe } from '../db/models/recipe.js'
import {
  createRecipe,
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByIngredient,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js'

import { createUser } from '../services/users.js'

// creating sample data
let sampleRecipes = [] // 'let' so it can be changed
let testUser = null
beforeAll(async () => {
  testUser = await createUser({ username: 'sample', password: 'user' })
  sampleRecipes = [
    {
      title: 'Ice cream',
      author: testUser._id,
      ingredients: ['eggs', 'cream', 'vanilla'],
      image: 'http://test/test1.jpg',
    },
    {
      title: 'BLT Sandwich',
      author: testUser._id,
      ingredients: ['bacon', 'lettuce', 'tomato', 'bread'],
      image: 'http://test/test2.png',
    },
    {
      title: 'Ice water',
      author: testUser._id,
      ingredients: ['ice', 'water'],
      image: 'http://test/test3.jpeg',
    },
    {
      title: 'Toast',
      author: testUser._id,
    },
  ]
})

let createdSampleRecipes = []

beforeEach(async () => {
  // delete any recipes in the database
  await Recipe.deleteMany({})
  // define locally ?
  createdSampleRecipes = []
  // iterate through sample data
  for (const recipe of sampleRecipes) {
    // create a Recipe instance from each sample recipe
    const createdRecipe = new Recipe(recipe)
    // save to db and push to array
    // using mongoose save functionality instead of createRecipe() to make sure tests are modular
    createdSampleRecipes.push(await createdRecipe.save())
  }
})

describe('creating recipes', () => {
  // test 1: creating recipes with all params
  test('with all parameters should succeed', async () => {
    const recipe = {
      title: 'Blueberry yoghurt',
      ingredients: ['blueberries', 'milk'],
    }
    const createdRecipe = await createRecipe(testUser._id, recipe)
    // expect createdRecipe's id to be an instance of a mongoose object id
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)

    // find createdRecipe in database
    const foundRecipe = await Recipe.findById(createdRecipe._id)
    // expect foundRecipe to have attributes equal to that of createdRecipe
    // expect it to contain our variable recipe
    expect(foundRecipe).toEqual(expect.objectContaining(recipe))
    // expect it to have timestamps
    expect(foundRecipe.createdAt).toBeInstanceOf(Date)
    expect(foundRecipe.updatedAt).toBeInstanceOf(Date)
  })
  // test 2: recipes should have a title
  test('without title should fail', async () => {
    const recipe = {
      ingredients: ['empty'],
    }
    try {
      await createRecipe(testUser._id, recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })
  // test 3: minimal parameters should succeed
  test('creating recipes with minimal parameters should succeed', async () => {
    const recipe = {
      title: 'Title only recipe',
    }
    const createdRecipe = await createRecipe(testUser._id, recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

describe('listing recipes', () => {
  // test 1: list all
  test('should return all recipes', async () => {
    const recipes = await listAllRecipes()
    expect(recipes.length).toEqual(createdSampleRecipes.length)
  })
  // test 2: sorting
  test('should return recipes sorted by creation date descending by default', async () => {
    const recipes = await listAllRecipes()
    // manual sort of createdSampleRecipes
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(recipes.map((recipe) => recipe.createdAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.createdAt),
    )
  })
  // test 3: custom sort
  test('should take into account provided sorting options', async () => {
    const recipes = await listAllRecipes({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => a.createdAt - b.createdAt,
    )
    expect(recipes.map((recipe) => recipe.updatedAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.updatedAt),
    )
  })
  // test 4: filter by ingredients
  test('should be able to filter recipes by ingredient', async () => {
    const recipes = await listRecipesByIngredient('water')
    expect(recipes.length).toBe(1)
  })
  // test 5: filter by author
  test('should be able to filter posts by author', async () => {
    const posts = await listRecipesByAuthor(testUser.username)
    expect(posts.length).toBe(4)
  })
})
// GET
describe('getting a recipe', () => {
  test('should return the full recipe', async () => {
    const recipe = await getRecipeById(createdSampleRecipes[0]._id)
    expect(recipe.toObject()).toEqual(createdSampleRecipes[0].toObject())
  })
  test('should fail if the id does not exist', async () => {
    // get recipe using fake id
    const recipe = await getRecipeById('000000000000000000000000')
    expect(recipe).toEqual(null)
  })
})
// UPDATE
describe('updating recipes', () => {
  test('should update the specified property', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      title: 'Test Title',
    })
    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedRecipe.title).toEqual('Test Title')
  })
  test('should not update other properties', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      image: 'http://test/new.jpg',
    })
    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedRecipe.ingredients[0]).toEqual('eggs')
  })
  test('should update the updatedAt timestamp', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      title: 'Test Title',
    })
    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    // check against the sample recipe in the array
    expect(updatedRecipe.updatedAt.getTime()).toBeGreaterThan(
      createdSampleRecipes[0].updatedAt.getTime(),
    )
  })
  test('should fail if the id does not exist', async () => {
    const recipe = await updateRecipe(
      testUser._id,
      '000000000000000000000000',
      {
        title: 'Test Title',
      },
    )
    expect(recipe).toEqual(null)
  })
})
describe('deleting recipes', () => {
  // delete a recipe that exists
  test('should remove the recipe from the database', async () => {
    const result = await deleteRecipe(testUser._id, createdSampleRecipes[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(deletedRecipe).toEqual(null)
  })
  // try to delete a recipe that doesn't exist
  test('should fail if the id does not exist', async () => {
    const result = await deleteRecipe('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
