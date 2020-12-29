import {ITask} from 'components/task/Task'
import {IColumn} from 'components/column/Column'
import {UPDATE_COLUMNS, DELETE_TASK} from './actions'
export interface ITaskList {
    [key: string]: ITask;
  }

  export interface IColumnList {
    [key: string]: IColumn;
  }
  

export interface IAppState {
    tasks: ITaskList,
    columns: IColumnList,
    columnLayout: string[]
}

interface UpdateColumnAction {
    type: typeof UPDATE_COLUMNS,
    payload: IColumn
}

interface DeleteTaskAction {
    type: typeof DELETE_TASK,
    payload: ITask["id"]
}

export type AppActionTypes = UpdateColumnAction | DeleteTaskAction