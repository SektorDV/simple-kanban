import React from "react";
import { Wrapper } from "./styles";
import Task, { ITask } from "components/task/Task";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IColumn {
  header: string;
  tasks: ITask[];
  id: string;
}

const TaskList = styled.div``;

const Column: React.FC<IColumn> = ({ header, children, tasks, id }) => {
  return (
    <Wrapper>
      <h2>{header}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <TaskList {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                index={index}
                id={task.id}
                content={task.content}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      {children}
    </Wrapper>
  );
};

export default Column;
