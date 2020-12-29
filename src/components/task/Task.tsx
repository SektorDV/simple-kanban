import React from "react";
import { Wrapper } from "./styles";
import { Draggable } from "react-beautiful-dnd";

export interface ITask {
  id: string;
  content: string;
  index?: number;
}

const Task: React.FC<ITask> = ({ id, content, index }) => {
  return (
    <Draggable draggableId={id} index={index || 0}>
      {(provided) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {content}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Task;
