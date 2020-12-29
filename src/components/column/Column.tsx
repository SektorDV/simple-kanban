import React from "react";
import { Wrapper } from "./styles";
import Task, { ITask } from "components/task/Task";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useSelector, RootStateOrAny } from "react-redux";

export interface IColumn {
  id: string;
  header: string;
  taskIds: ITask["id"][];
}

const TaskList = styled.div``;

const Column: React.FC<IColumn> = ({ header, children, taskIds, id }) => {
  const tasks = useSelector((state: RootStateOrAny) => state.tasks);
  return (
    <Wrapper>
      <h2>{header}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
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
        )}
      </Droppable>
      {children}
    </Wrapper>
  );
};

export default Column;
