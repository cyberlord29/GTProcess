import { takeLatest, put, fork } from 'redux-saga/effects'
import {
    GET_LATEST_USERS,
    GET_LATEST_USERS_SUCCESS
} from '../actions/git-actions'

import axios from 'axios'


function * getLatestUsersFlow() {
    yield takeLatest(GET_LATEST_USERS, getLatestUsers)
}

function * getLatestUsers() {
    const response = yield axios.get(`/users-latest`)
    if (response && response.data) {
        yield put({
            type: GET_LATEST_USERS_SUCCESS,
            data: response.data.userList
          })
    } 
}

export default [
    fork(getLatestUsersFlow)
]
