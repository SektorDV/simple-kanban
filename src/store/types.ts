import {ITask} from 'components/task/Task'
import {IColumn} from 'components/column/Column'
import {UPDATE_COLUMNS} from './actions'
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

export type AppActionTypes = UpdateColumnAction