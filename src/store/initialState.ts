import {IAppState} from './types'

export const initialData: IAppState = {
    tasks: {
    },
    columns: {
        'column-1': {
            id: 'column-1',
            header: 'To do',
            taskIds: []
        },
        'column-2': {
            id: 'column-2',
            header: 'In Progress',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            header: 'Done',
            taskIds: []
        }
    },
    columnLayout: ['column-1', 'column-2', 'column-3'],
    currentIndex: 1
}
