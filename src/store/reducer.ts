import {UPDATE_COLUMNS, DELETE_TASK, ADD_TASK} from './actions'
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
        case DELETE_TASK:
            const newTasks = {...state.tasks};
            delete newTasks[action.payload];

            const columnToUpdate = Object.values(state.columns).filter(column => column.taskIds.includes(action.payload))[0]
            const newTaskIds = columnToUpdate.taskIds.filter(taskId => taskId !== action.payload)

            return {
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

        case ADD_TASK:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [`task-${state.currentIndex}`]: {
                        id: `task-${state.currentIndex}`,
                        content: 'New task'
                    }
                },
                columns: {
                    ...state.columns,
                    [action.payload.columnId]: {
                        ...state.columns[action.payload.columnId],
                        taskIds: [...state.columns[action.payload.columnId].taskIds, `task-${state.currentIndex}`]
                    }
                },
                currentIndex: state.currentIndex + 1
            }
        default:
            return state
    }
}