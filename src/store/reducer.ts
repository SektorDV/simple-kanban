import {UPDATE_COLUMNS} from './actions'
import {AppActionTypes} from './types'
import {initialData} from './initialState'
/* eslint-disable import/no-anonymous-default-export */
export default (state = initialData, action: AppActionTypes) => {
    switch(action.type) {
        case UPDATE_COLUMNS:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.id]: action.payload
                }
                
            }
        default:
            return state
    }
}