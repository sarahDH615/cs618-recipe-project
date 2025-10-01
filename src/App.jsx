import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecipeBlog } from './pages/RecipeBlog.jsx'
import { Signup } from './pages/Signup.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login.jsx'

// client to call the backend
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <RecipeBlog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
