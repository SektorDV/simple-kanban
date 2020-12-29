import {createStore } from 'redux';
import reducer from './reducer';
import {initialData} from './initialState'

const configureStore = ()=> {
    return createStore(reducer, initialData)
}

export default configureStore