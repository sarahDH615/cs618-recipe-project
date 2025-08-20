import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

await initDatabase() // async

const post = new Post({
  title: 'Hello Mongoose',
  author: 'S. Hood',
  contents: 'This post is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})
const createdPost = await post.save() // save the post in the db and to a variable

await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hello again, Mongoose!' },
})

const posts = await Post.find() // return all Post instances
console.log(posts)
