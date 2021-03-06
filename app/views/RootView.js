import React from 'react'
import Store from 'electron-store'
import LoginView from './LoginView'
import MainView from './MainView'
import api from '../utils/api'
import { CredentialsProvider } from '../utils/CredentialsContext'

const STORE_KEYS = {
  accessToken: 'ACCESS_TOKEN'
}

const schema = {
  [STORE_KEYS.accessToken]: {
    type: 'string',
    default: undefined
  }
}

function RootView() {
  async function isValidToken(token) {
    try {
      const data = await api.user.account(token)
      console.log(data)
      if (data) return true
    } catch (error) {
      console.log(error)
      console.log('not valid')
      return false
    }
  }

  async function handleLoginSubmit(token) {
    if (await isValidToken(token)) {
      dataStore.set(STORE_KEYS.accessToken, token)
      console.log('valid')
    }
    // Handle invalid token UI foo
    console.log(token)
  }

  const dataStore = new Store(schema)

  // TODO: Also check, if the saved token is still valid
  // TODO: Dynamically get accessToken on rerender, so that after setting it the user is
  // redirected
  const accessToken = dataStore.get(STORE_KEYS.accessToken)
  console.log(`accessToken: ${accessToken}`)

  return accessToken ? (
    <CredentialsProvider value={accessToken}>
      <MainView />
    </CredentialsProvider>
  ) : (
    <LoginView onSubmit={handleLoginSubmit} />
  )
}

export default RootView
