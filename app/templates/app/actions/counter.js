import * as AT from '../constants/actions'

import { get } from '../utils/request'

export function increment() {
  return (dispatch) => {
    dispatch({
      type: AT.INCREMENT,
    })
  }
}

export function decrement() {
  return (dispatch) => {
    dispatch({
      type: AT.DECREMENT,
    })
  }
}

export function saveOnServer() {
  return (dispatch, getState) => {
    const state = getState()
    const params = { v: state.counter.value }

    dispatch({
      type: AT.SAVE_ON_SERVER_REQUEST,
      params,
    })

    return get('/save', params)
      .then(response => dispatch({
        type: AT.SAVE_ON_SERVER_SUCCESS,
        params,
        response,
      }))
      .catch(error => dispatch({
        type: AT.SAVE_ON_SERVER_FAILURE,
        params,
        error: error.message,
      }))
  }
}

export function clearError() {
  return (dispatch) => {
    dispatch({
      type: AT.CLEAR_ERROR,
    })
  }
}