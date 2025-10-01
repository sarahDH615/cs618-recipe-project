import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'
import { useState } from 'react'
import { Header } from '../components/Header.jsx'

export function RecipeBlog() {
  const [author, setAuthor] = useState('') // default: ''
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // create query to call the backend and read an endpoint
  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }], // the endpoint it reads and the params it passes to it
    queryFn: () => getRecipes({ author, sortBy, sortOrder }), // the function it calls to read the endpoint
  })

  const recipes = recipesQuery.data ?? [] // get data from the query
  return (
    <div style={{ padding: 8 }}>
      <Header />
      <CreateRecipe />
      <br />
      <br />
      Filter by:
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}
