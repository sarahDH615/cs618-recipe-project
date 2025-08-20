import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { initDatabase } from '../db/init.js'

// before any tests, initialise mongoose database
beforeAll(async () => {
  await initDatabase()
})
// after any tests, disconnect from database
afterAll(async () => {
  await mongoose.disconnect()
})
