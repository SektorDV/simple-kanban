import React from "react";
import { Wrapper, CloseButton, TaskId } from "./styles";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { DELETE_TASK } from "store/actions";

export interface ITask {
  id: string;
  content: string;
  index?: number;
}

const Task: React.FC<ITask> = ({ id, content, index }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: ITask["id"]) => {
    dispatch({ type: DELETE_TASK, payload: id });
  };

  return (
    <Draggable draggableId={id} index={index || 0}>
      {(provided) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {content}
          <CloseButton onClick={() => handleDelete(id)}>x</CloseButton>
          <TaskId>Task ID: {id}</TaskId>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Task;
