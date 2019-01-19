import {
    GET_LATEST_USERS_SUCCESS
} from '../actions/git-actions'
import { stat } from 'fs';

const initialState = {
    increment: 0,
    data:{},
    tickerData:[{a: 0, b:2}]
}

const gitReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_LATEST_USERS_SUCCESS:
        let increment = state.data.total_count?action.data.total_count - state.data.total_count:0
        let newTick  = { a: state.tickerData[state.tickerData.length-1].a+1 , b: increment*10 + 2 }
        let existingTickerData = state.tickerData
        if(state.tickerData.length>10)
            existingTickerData.shift()
        let newTickerData = [...state.tickerData ,newTick]

        return {
            ...state,
            data: action.data,
            tickerData : newTickerData,
            increment: increment
        }
        default:
        return state
    }
}

export default gitReducer
