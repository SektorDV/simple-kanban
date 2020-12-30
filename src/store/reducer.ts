import {UPDATE_COLUMNS, DELETE_TASK, ADD_TASK, UPDATE_TASK_CONTENT} from './actions'
import {AppActionTypes} from './types'
import {initialData} from './initialState'
import {IAppState} from './types'
/* eslint-disable import/no-anonymous-default-export */

const updateLocal = (state: IAppState) => {
    window.localStorage.setItem('appData', JSON.stringify(state))
}

export default (state = initialData, action: AppActionTypes) => {
    let newState
    switch(action.type) {
        case UPDATE_COLUMNS:
            newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.id]: action.payload
                }
            }
            updateLocal(newState);
            return newState
        case DELETE_TASK:
            const newTasks = {...state.tasks};
            delete newTasks[action.payload];

            const columnToUpdate = Object.values(state.columns).filter(column => column.taskIds.includes(action.payload))[0]
            const newTaskIds = columnToUpdate.taskIds.filter(taskId => taskId !== action.payload)

            newState = {
                ...state,
                tasks: newTasks,
                columns: {
                    ...state.columns,
                    [columnToUpdate.id]: {
                        ...columnToUpdate,
                        taskIds: newTaskIds
                    }
                }
            }
            updateLocal(newState);
            return newState;

        case ADD_TASK:
            newState = {
                ...state,
                tasks: {
                    ...state.tasks,
                    [`task-${state.currentIndex}`]: {
                        id: `task-${state.currentIndex}`,
                        content: ''
                    }
                },
                columns: {
                    ...state.columns,
                    [action.payload]: {
                        ...state.columns[action.payload],
                        taskIds: [...state.columns[action.payload].taskIds, `task-${state.currentIndex}`]
                    }
                },
                currentIndex: state.currentIndex + 1
            }
            updateLocal(newState)
            return newState

        case UPDATE_TASK_CONTENT:
            newState = {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.payload.taskId]: {
                        ...state.tasks[action.payload.taskId],
                        content: action.payload.content
                    }
                }
            }
            updateLocal(newState);
            return newState;
        default:
            return state
    }
}