import React, { useState } from 'react'
import Home from '../components/Home'
import Login from '../components/Login'

// TODO: Validate token somehow
// TODO: Save valid token to fs
function HomePage() {
  const [token, setToken] = useState('asd')

  // TODO: Actually check for presence of oAuth token
  const oAtuhTokenPresent = token && token.length > 0

  function handleSubmitToken(submittedToken) {
    setToken(submittedToken)
  }

  return oAtuhTokenPresent ? <Home /> : <Login onSubmit={handleSubmitToken} />
}

export default HomePage
