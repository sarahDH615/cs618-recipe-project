import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { useQuery, useMutation } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { Header } from '../components/Header.jsx'
import { Recipe } from '../components/Recipe.jsx'
import { getRecipeById } from '../api/recipes.js'
import { Helmet } from 'react-helmet-async'
import { getUserInfo } from '../api/users.js'
// import { useEffect, useState } from 'react'
// import { recipeTrackEvent } from '../api/events.js'
// import { RecipeStats } from '../components/RecipeStats.jsx'

function truncate(str, max = 160) {
  if (!str) return str
  if (str.length > max) {
    return str.slice(0, max - 3) + '...'
  } else {
    return str
  }
}

export function ViewRecipe({ recipeId }) {
  // const [session, setSession] = useState()

  // const trackEventMutation = useMutation({
  //   mutationFn: (action) => recipeTrackEvent({ recipeId, action, session }),
  //   onSuccess: (data) => setSession(data?.session),
  // })

  /*
  useEffect(setup, dependencies?)
  see https://react.dev/reference/react/useEffect#useeffect
  logic:
    mount: setup function runs when component is added to the dom
    on designated re-renders (see below): 
      cleanup function runs using old values on page re-render,
      THEN runs setup function with new values
    unmount: cleanup function runs when component is removed from the dom
    IF dependencies are specified in an array, if any of them change (with a page re-render?),
      (cleanup &) setup function(s) run(s) again
    IF an empty array is passed as dependencies, the (cleanup &) setup  function(s)
      do(es) not re-run on re-render
    IF no dependencies are passed at all, the (cleanup &) setup function(s) re-run(s) on every re-render
  */
  // useEffect(() => {
  //   // -- SETUP FUNCTION
  //   // set 1 second wait, after which the mutation function will run
  //   let timeout = setTimeout(() => {
  //     trackEventMutation.mutate('startView')
  //     timeout = null
  //   }, 1000)
  //   // --
  //   // CLEANUP FUNCTION : ie, when user leaves the page
  //   return () => {
  //     if (timeout) clearTimeout(timeout)
  //     else trackEventMutation.mutate('endView')
  //   }
  //   // --
  // }, []) // array of no dependencies, so it only runs on page load and close

  // query to get recipe with the specified id
  const recipeQuery = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })
  const recipe = recipeQuery.data
  // console.log(recipe)
  const userInfoQuery = useQuery({
    queryKey: ['users', recipe?.author],
    queryFn: () => getUserInfo(recipe?.author),
    enabled: Boolean(recipe?.author),
  })
  const userInfo = userInfoQuery.data ?? {}
  // header and link back to main page
  // if recipe was suuccessfully fetched, show recipe
  // otherwise show 'not found'
  return (
    <div style={{ padding: 8 }}>
      {recipe && (
        <Helmet>
          <title>{recipe.title} | Recipe Blog</title>
          <meta name='description' content={truncate(recipe.ingredients)} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={recipe.title} />
          <meta
            property='og:article:published_time'
            content={recipe.createdAt}
          />
          <meta
            property='og:article:modified_time'
            content={recipe.updatedAt}
          />
          <meta property='og:article:author' content={userInfo.username} />
          {/* {(recipe.tags ?? []).map((tag) => (
            <meta key={tag} property='og:article:tag' content={tag} />
          ))} */}
        </Helmet>
      )}
      <Header />
      <br />
      <hr />
      <Link to='/'>Back to main page</Link>
      <br />
      <hr />
      {recipe ? (
        <div>
          {/* <Recipe {...recipe} fullRecipe author={userInfo} /> */}
          <Recipe {...recipe} fullRecipe />
          {/* <hr />
          <RecipeStats recipeId={recipeId} /> */}
        </div>
      ) : (
        `Recipe with id ${recipeId} not found.`
      )}
    </div>
  )
}

ViewRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
