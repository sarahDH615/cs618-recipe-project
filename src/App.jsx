import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecipeBlog } from './RecipeBlog.jsx'

// client to call the backend
const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeBlog />
    </QueryClientProvider>
  )
}
