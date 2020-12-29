import {createStore } from 'redux';
import reducer from './reducer';
import {initialData} from './initialState'
import {IAppState} from './types'
const initialState = () => {
    try {
        const localState = JSON.parse(localStorage.getItem('appData') || '');
        if(localState) {
            const testObject = localState as IAppState;
            if(
                testObject.columnLayout !== undefined && 
                testObject.columns !== undefined && 
                testObject.tasks !== undefined && 
                testObject.currentIndex !== undefined
                )
            return localState
        }
        return initialData
    }
    catch {
        localStorage.removeItem('appData')
        return initialData
    }

}

const configureStore = ()=> {
    return createStore(reducer, initialState())
}

export default configureStore