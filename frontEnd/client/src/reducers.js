import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import gitReducer from './reducers/gitReducer'

export default combineReducers({
    git: gitReducer
  })