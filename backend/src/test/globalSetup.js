import { MongoMemoryServer } from 'mongodb-memory-server'
// MongoMemoryServer is a db in memory for testing

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '8.0.0', // version 6.0.4 as specified in the textbook, gives error
    },
  })
  // global variable
  global.__MONGOINSTANCE = instance
  // environment variable
  process.env.DATABASE_URL = instance.getUri()
}
