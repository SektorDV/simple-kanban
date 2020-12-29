import React, { useState } from "react";
import { Wrapper } from "./styles/index";
import Column from "components/column/Column";
import Task, { ITask } from "components/task/Task";
import Button from "components/button/Button";
import initialData from "initialData";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
interface IColumn {
  id: string;
  header: string;
  taskIds: ITask["id"][];
}

interface ITaskList {
  [key: string]: ITask;
}

const Main: React.FC = () => {
  const [currentId, setCurrentId] = useState<number>(1);
  const [tasks, setTasks] = useState<ITaskList>(initialData.tasks);
  const [columns, setColumns] = useState<IColumn[]>(initialData.columns);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => {
          const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

          return (
            <Column header={column.header} tasks={columnTasks}>
              <Button color="green" label="+" />
            </Column>
          );
        })}
      </DragDropContext>
    </Wrapper>
  );
};

export default Main;
