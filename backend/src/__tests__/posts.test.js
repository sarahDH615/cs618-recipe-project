import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'
import { createPost } from '../services/posts.js'
import { Post } from '../db/models/post.js'

// test 1: creating posts
describe('creating posts', () => {
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
