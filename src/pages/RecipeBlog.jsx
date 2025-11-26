import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
// import { useQuery } from '@tanstack/react-query'
// import { getRecipes } from '../api/recipes.js'
// import { getLikes } from '../api/likes.js'
// import { useEffect, useState } from 'react'
import { useState } from 'react'
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
// import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
// import { GET_RECIPE_IDS, GET_RECIPES, GET_RECIPES_BY_AUTHOR, REFRESH_LIKES } from '../api/graphql/recipes.js'
import { GET_RECIPES, GET_RECIPES_BY_AUTHOR } from '../api/graphql/recipes.js'
// import { useEffect, useState } from 'react'

export function RecipeBlog() {
  const [author, setAuthor] = useState('') // default: ''
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // create query to call the backend and read an endpoint
  // const recipesQuery = useQuery({
  //   queryKey: ['recipes', { author, sortBy, sortOrder }], // the endpoint it reads and the params it passes to it
  //   queryFn: () => getRecipes({ author, sortBy, sortOrder }), // the function it calls to read the endpoint
  // })
  // const recipes = recipesQuery.data ?? [] // get data from the query

  const recipesQuery = useGraphQLQuery(
    author ? GET_RECIPES_BY_AUTHOR : GET_RECIPES,
    {
      variables: { author, options: { sortBy, sortOrder } },
    },
  )
  // const [refreshLikes] = useGraphQLMutation(REFRESH_LIKES)

  const recipes =
    recipesQuery.data?.recipesByAuthor ?? recipesQuery.data?.recipes ?? []

  for (const recipe of recipes) {
    console.log(`recipe ${recipe.title} likes: ${recipe.likeCount}`)
    // refreshLikes({ variables: { recipeId: recipe.id, likeCount: recipe.likeCount } })
  }

  // for (const recipe of recipes) {
  //   const totalLikes = useQuery({
  //     queryKey: ['likes', recipe._id],
  //     queryFn: () => getLikes(recipe._id),
  //   })
  //   const tlData = totalLikes.data ?? false
  //   console.log(`total likes for recipe ${recipe._id}: ${tlData}`)
  //   if (tlData) {
  //     recipe.likeCount = tlData
  //   }
  // }
  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Recipe Blog</title>
        <meta name='description' content='A blog for recipes.' />
      </Helmet>
      <Header />
      <CreateRecipe />
      Filter by:
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={['createdAt', 'updatedAt', 'likeCount']}
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
