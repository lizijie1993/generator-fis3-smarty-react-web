/**
 * @file 基于 dva request 的request方法
 */

import fetch from 'isomorphic-fetch'

import obj2str from './obj2str'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
async function request(url, options) {
  const response = await fetch(url, options)

  checkStatus(response)

  const data = await response.json()

  return data
}

// === 对一些类型请求封装了基本的配置 ===

export function get(url, paramObj, options) {
  let query = obj2str(paramObj)

  if (query.length > 0) {
    query = `?${query}`
  }

  const theOptions = Object.assign({}, {
    method: 'GET',
    credentials: 'include', // cookie
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
    mode: 'no-cors',
  }, options)

  return request(`${url}${query}`, theOptions)
}

export function post(url, paramObj, options) {
  const theOptions = Object.assign({}, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: obj2str(paramObj),
  }, options)

  return request(url, theOptions)
}
