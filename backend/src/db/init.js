import mongoose from 'mongoose'

export function initDatabase() {
  // use mongodb db with database name blog
  const DATABASE_URL = 'mongodb://localhost:27017/blog'
  //   create a listener on the opening of the mongoose connection
  //   it will log when it has been opened
  mongoose.connection.on('open', () => {
    console.info('Successfully connected to database:', DATABASE_URL)
  })
  //   connect to the db
  const connection = mongoose.connect(DATABASE_URL)
  return connection
}
