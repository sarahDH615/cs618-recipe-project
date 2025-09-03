import { RecipeList } from './components/RecipeList.jsx'
import { CreateRecipe } from './components/CreateRecipe.jsx'
import { RecipeFilter } from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from './api/recipes.js'
import { useState } from 'react'

export function RecipeBlog() {
  const [title, setTitle] = useState('') // default: ''
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // create query to call the backend and read an endpoint
  const postsQuery = useQuery({
    queryKey: ['recipes', { title, sortBy, sortOrder }], // the endpoint it reads and the params it passes to it
    queryFn: () => getRecipes({ title, sortBy, sortOrder }), // the function it calls to read the endpoint
  })

  const recipes = postsQuery.data ?? [] // get data from the query
  return (
    <div style={{ padding: 8 }}>
      <CreateRecipe />
      <br />
      <br />
      Filter by:
      <RecipeFilter
        field='title'
        value={title}
        onChange={(value) => setTitle(value)}
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
