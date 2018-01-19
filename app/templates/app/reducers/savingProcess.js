import * as AT from '../constants/actions'

export default function savingProcess(
  state={
    isFetching: false,
    errmsg: '',
  },
  action) {
  switch (action.type) {
    case AT.SAVE_ON_SERVER_REQUEST:
      return Object.assign({}, state, { isFetching: true })
    case AT.SAVE_ON_SERVER_SUCCESS: 
      return Object.assign({}, state, { isFetching: false })
    case AT.SAVE_ON_SERVER_FAILURE:
      return Object.assign({}, state, { isFetching: false, errmsg: action.error })
    case AT.CLEAR_ERROR:
      return Object.assign({}, state, { errmsg: '' })
    default:
      return state;
  }
}
