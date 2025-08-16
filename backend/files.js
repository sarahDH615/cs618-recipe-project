import { writeFileSync, readFileSync } from 'node:fs'
// create an array, turn it to json, save it to a file
const users = [
  {
    name: 'Adam Ondra',
    email: 'adam.ondra@climb.ing',
  },
]
const usersJson = JSON.stringify(users)
writeFileSync('backend/users.json', usersJson)
// read the file back in, parse it into an arrray, log it
const readUsersJson = readFileSync('backend/users.json')
const readUsers = JSON.parse(readUsersJson)
console.log(readUsers)
