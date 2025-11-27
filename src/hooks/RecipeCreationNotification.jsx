import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketIOContext.jsx'
// import { io } from 'socket.io-client'

export function RecipeCreationNotification() {
  const { socket, status } = useSocket()
  // for storing messages sent into the browser by users
  const [recipeNotification, setRecipeNotification] = useState({})

  // updates the state variable to the received notification
  function receiveNotification(notification) {
    // console.log(`Notification "${JSON.stringify(notification)}" received`)
    setRecipeNotification(notification)
  }

  // listens for broadcast emit from backend and updates notification variable
  useEffect(() => {
    if (status == 'connected') {
      console.log('socket is connected')
      socket.on('recipe.notif', receiveNotification)
      return () => socket.off('recipe.notif', receiveNotification)
    }
  }, [])

  async function sendNotification(notification) {
    console.log(
      `send notification function with notification: ${JSON.stringify(
        notification,
      )}`,
    )
    socket.emit('recipe.notif', notification)
  }

  return { recipeNotification, sendNotification }
}
