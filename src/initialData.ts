const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Task 1'},
        'task-2': {id: 'task-2', content: 'Task 2'},
        'task-3': {id: 'task-3', content: 'Task 3'},
        'task-4': {id: 'task-4', content: 'Task 4'}
    },
    columns: [
        {
            id: 'todo',
            header: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        {
            id: 'inProgress',
            header: 'In Progress',
            taskIds: [],
        },
        {
            id: 'done',
            header: 'Done',
            taskIds: []
        }
    ]
}

export default initialData