import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import { Post } from '../db/models/post.js'
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
} from '../services/posts.js'

// creating sample data
const samplePosts = [
  { title: 'Learning Redux', author: 'Daniel Bugl', tags: ['redux'] },
  { title: 'Learn React Hooks', author: 'Daniel Bugl', tags: ['react'] },
  {
    title: 'Full-Stack React Projects',
    author: 'Daniel Bugl',
    tags: ['react', 'nodejs'],
  },
  { title: 'Guide to TypeScript' },
]

let createdSamplePosts = []

beforeEach(async () => {
  // delete any posts in the database
  await Post.deleteMany({})
  // define locally ?
  createdSamplePosts = []
  // iterate through sample data
  for (const post of samplePosts) {
    // create a Post instance from each sample post
    const createdPost = new Post(post)
    // save to db and push to array
    // using mongoose save functionality instead of createPost() to make sure tests are modular
    createdSamplePosts.push(await createdPost.save())
  }
})

describe('creating posts', () => {
  // test 1: creating posts with all params
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Mongoose!',
      author: 'Daniel Bugl',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)
    // expect createdPost's id to be an instance of a mongoose object id
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    // find createdPost in database
    const foundPost = await Post.findById(createdPost._id)
    // expect foundPost to have attributes equal to that of createdPost
    // expect it to contain our variable post
    expect(foundPost).toEqual(expect.objectContaining(post))
    // expect it to have timestamps
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })
  // test 2: posts should have a title
  test('without title should fail', async () => {
    const post = {
      author: 'Daniel Bugl',
      contents: 'Post with no title.',
      tags: ['empty'],
    }
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })
  // test 3: minimal parameters should succeed
  test('creating posts with minimal parameters should succeed', async () => {
    const post = {
      title: 'Title only post',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

describe('listing posts', () => {
  // test 1: list all
  test('should return all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })
  // test 2: sorting
  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts()
    // manual sort of createdSamplePosts
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })
  // test 3: custom sort
  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.createdAt - b.createdAt,
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })
  // test 4: filter by author
  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Daniel Bugl')
    expect(posts.length).toBe(3)
  })
  // test 5: filter by tags
  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('nodejs')
    expect(posts.length).toBe(1)
  })
})
