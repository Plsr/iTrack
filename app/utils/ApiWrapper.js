import changeCaseObject from 'change-case-object'
import qs from 'query-string'
import merge from 'deepmerge'

const ALLOWED_REQUEST_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
const PROTECTED_BODY_KEYS = ['clientID', 'clientSecret', 'oauthRedirectURI']
/* eslint-disable */
/**
 * NOTE: This is a slightly modified version of the Snuffles source code
 * (https://github.com/railslove/snuffles)
 * We decided to remove the dependency on snuffles and just include a modified
 * version of the source code that fits our needs to be able to progress faster.
 * Once the things we need from Snuffles are implemented in there, it should be easy
 * to just remove this class and swap it for Snuffles.
 */
export default class ApiWrapper {
  constructor(baseUrl, defaultRequestOptions = {}) {
    if (!baseUrl) {
      throw new Error('baseUrl has to be set')
    }

    this.baseUrl = baseUrl
    this.defaultRequestOptions = defaultRequestOptions
  }

  get(path, options = {}) {
    return this.request(path, { ...options, method: 'GET' })
  }

  post(path, options = {}) {
    return this.request(path, { ...options, method: 'POST' })
  }

  put(path, options = {}) {
    return this.request(path, { ...options, method: 'PUT' })
  }

  patch(path, options = {}) {
    return this.request(path, { ...options, method: 'PATCH' })
  }

  delete(path, options = {}) {
    return this.request(path, { ...options, method: 'DELETE' })
  }

  fullUrl(path) {
    return this.baseUrl + path
  }

  validMethod(method) {
    return ALLOWED_REQUEST_METHODS.includes(method.toString())
  }

  /**
   * @param  {string} path the path of the request
   * @param  {Object} options optional options, sepcific for this single request
   * @return {Object} res camelCased response
   */
  request(path, options = {}) {
    const url = this.fullUrl(path)
    const fullOptions = merge(this.defaultRequestOptions, options)

    if (!fullOptions.method || !this.validMethod(fullOptions.method)) {
      throw new Error('A valid HTTP request method must be used')
    }

    const queryString = fullOptions.query
      ? `?${qs.stringify(options.query)}`
      : ''

    const { query, ...requestOptions } = fullOptions

    if (requestOptions.body) {
      const mergedBody = this.saveCamelCaseBody(requestOptions.body)
      requestOptions.body = JSON.stringify(mergedBody)
    }

    return fetch(`${url}${queryString}`, {
      ...requestOptions
    })
      .then(res => {
        if (!res.ok) {
          const error = new Error('API response was not ok.')
          error.response = res
          throw error
        }

        return res
      })
      .then(res => res.text())
      .then(text => (text ? JSON.parse(text) : {}))
      .then(json => changeCaseObject.camelCase(json))
  }

  saveCamelCaseBody(body) {
    const originalBody = { ...body }
    const protectedBody = {}

    PROTECTED_BODY_KEYS.forEach(key => {
      if (originalBody[key] !== undefined) {
        protectedBody[key] = originalBody[key]
        delete originalBody[key]
      }
    })

    const casedBody = changeCaseObject.camelCase(originalBody)
    return { ...casedBody, ...protectedBody }
  }
}
