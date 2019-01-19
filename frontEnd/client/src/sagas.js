import { all } from 'redux-saga/effects'
import git from './sagas/git-sagas'

function* saga () {
  yield all([
     ...git,
  ])
}

export default saga
