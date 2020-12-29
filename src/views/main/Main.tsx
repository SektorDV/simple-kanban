import React, { useState } from "react";
import { Wrapper } from "./styles/index";
import Column from "components/column/Column";
import { ITask } from "components/task/Task";
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

interface IColumnList {
  [key: string]: IColumn;
}

const Main: React.FC = () => {
  const [currentId, setCurrentId] = useState<number>(1);
  const [tasks, setTasks] = useState<ITaskList>(initialData.tasks);
  const [columns, setColumns] = useState<IColumnList>(initialData.columns);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    if (source.droppableId === destination.droppableId) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };
      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      const newSourceTaskIds = Array.from(sourceColumn.taskIds);
      const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
      newSourceTaskIds.splice(source.index, 1);
      newDestinationTaskIds.splice(destination.index, 0, draggableId);

      const newSourceColumn = {
        ...sourceColumn,
        taskIds: newSourceTaskIds,
      };

      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      };

      setColumns({
        ...columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      });
    }
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {initialData.columnLayout.map((column) => {
          const columnTasks = columns[column].taskIds.map(
            (taskId) => tasks[taskId]
          );

          return (
            <Column
              key={column}
              header={columns[column].header}
              tasks={columnTasks}
              id={column}
            >
              <Button color="green" label="+" />
            </Column>
          );
        })}
      </DragDropContext>
    </Wrapper>
  );
};

export default Main;
