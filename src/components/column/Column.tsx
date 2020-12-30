import React from "react";
import { Wrapper, TaskList } from "./styles";
import Task, { ITask } from "components/task/Task";
import { Droppable } from "react-beautiful-dnd";
import { useSelector, RootStateOrAny } from "react-redux";

export interface IColumn {
  id: string;
  header: string;
  taskIds: ITask["id"][];
}

export interface IWrapper {
  draggedOver?: boolean;
}

const Column: React.FC<IColumn> = ({ header, children, taskIds, id }) => {
  const tasks = useSelector((state: RootStateOrAny) => state.tasks);
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <Wrapper draggedOver={snapshot.isDraggingOver}>
          <h2>{header}</h2>
          <TaskList {...provided.droppableProps} ref={provided.innerRef}>
            {taskIds.map((taskId: ITask["id"], index: number) => {
              return (
                <Task
                  key={tasks[taskId].id}
                  index={index}
                  id={tasks[taskId].id}
                  content={tasks[taskId].content}
                />
              );
            })}
            {provided.placeholder}
          </TaskList>
          {children}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Column;
