import { MongoMemoryServer } from 'mongodb-memory-server'
// MongoMemoryServer is a db in memory for testing

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4',
    },
  })
  // global variable
  global.__MONGOINSTANCE = instance
  // environment variable
  process.env.DATABASE_URL = instance.getUri()
}
