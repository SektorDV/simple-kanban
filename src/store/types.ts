import {ITask} from 'components/task/Task'
import {IColumn} from 'components/column/Column'
import {UPDATE_COLUMNS, DELETE_TASK, ADD_TASK, UPDATE_TASK_CONTENT} from './actions'
export interface ITaskList {
    [key: string]: ITask;
  }

  export interface IColumnList {
    [key: string]: IColumn;
  }
  

export interface IAppState {
    tasks: ITaskList,
    columns: IColumnList,
    columnLayout: string[],
    currentIndex: number
}

interface UpdateColumnAction {
    type: typeof UPDATE_COLUMNS,
    payload: IColumn
}

interface DeleteTaskAction {
    type: typeof DELETE_TASK,
    payload: ITask["id"]
}

interface AddTaskAction {
    type: typeof ADD_TASK,
    payload: {
        columnId: IColumn["id"]
    }
}

interface UpdateTaskAction {
    type: typeof UPDATE_TASK_CONTENT,
    payload: {
        taskId: ITask["id"],
        content: ITask["content"]
    }
}

export type AppActionTypes = UpdateColumnAction | DeleteTaskAction | AddTaskAction | UpdateTaskAction