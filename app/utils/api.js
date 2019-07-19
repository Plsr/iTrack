import ApiWrapper from './ApiWrapper'

const baseUrl = 'https://api.nokotime.com/v2'

const api = new ApiWrapper(baseUrl)

export default {
  user: {
    account(authorizationToken) {
      const authHeader = { 'X-NokoToken': authorizationToken }
      return api.get('/account', { headers: { ...authHeader } })
    }
  }
}
