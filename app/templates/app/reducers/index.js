import { combineReducers } from 'redux'

import counter from './counter'
import savingProcess from './savingProcess'

const rootReducer = combineReducers({
  counter,
  savingProcess,
})

export default rootReducer
