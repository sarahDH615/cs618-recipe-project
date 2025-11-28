import { RecipeList } from '../components/RecipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/RecipeFilter.jsx'
import { RecipeSorting } from '../components/RecipeSorting.jsx'
// import { useQuery } from '@tanstack/react-query'
// import { getRecipes } from '../api/recipes.js'
// import { getLikes } from '../api/likes.js'
import { useEffect, useState } from 'react'
// import { useState } from 'react'
import { Header } from '../components/Header.jsx'
import { Helmet } from 'react-helmet-async'
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
// import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
// import { GET_RECIPE_IDS, GET_RECIPES, GET_RECIPES_BY_AUTHOR, REFRESH_LIKES } from '../api/graphql/recipes.js'
import { GET_RECIPES, GET_RECIPES_BY_AUTHOR } from '../api/graphql/recipes.js'
// import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import slug from 'slug'
// import { useSocket } from '../contexts/SocketIOContext.jsx'
import { RecipeCreationNotification } from '../hooks/RecipeCreationNotification.jsx'
import { Modal } from '../components/Modal.jsx'

export function RecipeBlog() {
  const [author, setAuthor] = useState('') // default: ''
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  // const { socket } = useSocket()
  const { recipeNotification } = RecipeCreationNotification()
  const [creationNotification, setCreationNotification] = useState(null)
  const [modalDismissed, setModalDismissed] = useState(false)

  // update with message
  useEffect(() => {
    if (recipeNotification) {
      setCreationNotification(recipeNotification)
    }
  }, [recipeNotification])

  const recipesQuery = useGraphQLQuery(
    author ? GET_RECIPES_BY_AUTHOR : GET_RECIPES,
    {
      variables: { author, options: { sortBy, sortOrder } },
    },
  )
  // const [refreshLikes] = useGraphQLMutation(REFRESH_LIKES)

  const recipes =
    recipesQuery.data?.recipesByAuthor ?? recipesQuery.data?.recipes ?? []

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
      {!modalDismissed && creationNotification ? (
        <Modal onClose={() => setModalDismissed(true)}>
          <p>
            New recipe {creationNotification.notification.title} made by{' '}
            {creationNotification.username}! Click{' '}
            <Link to={creationNotification.notification.link}>here</Link> to
            read!
          </p>
        </Modal>
      ) : null}
    </div>
  )
}
