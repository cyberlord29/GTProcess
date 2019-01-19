import { combineReducers } from 'redux'
import gitReducer from './reducers/gitReducer'

export default combineReducers({
    git: gitReducer
  })