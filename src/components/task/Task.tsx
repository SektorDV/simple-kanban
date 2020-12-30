import React, { useState, useRef, useEffect } from "react";
import { Wrapper, CloseButton, TaskId, TaskText } from "./styles";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { DELETE_TASK, UPDATE_TASK_CONTENT } from "store/actions";
import Swal from "sweetalert2";

export interface ITask {
  id: string;
  content: string;
  index?: number;
}

export interface IWrapper {
  dragged?: boolean;
}

const Task: React.FC<ITask> = ({ id, content, index }) => {
  const [isEdit, setEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [textAreaRef, isEdit]);

  const handleDelete = (id: ITask["id"]) => {
    Swal.fire({
      title: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true,
      showConfirmButton: false,
      showCloseButton: false,
      denyButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isDenied) {
        dispatch({ type: DELETE_TASK, payload: id });
      }
    });
  };

  const toggleEdit = () => {
    setEdit(!isEdit);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.currentTarget.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      setEdit(!isEdit);
    }
    if (e.key === "Enter") {
      setEdit(!isEdit);
      setCurrentContent(e.currentTarget.value);
      dispatch({
        type: UPDATE_TASK_CONTENT,
        payload: { taskId: id, content: e.currentTarget.value },
      });
    }
  };

  return (
    <Draggable draggableId={id} index={index || 0}>
      {(provided, snapshot) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          dragged={snapshot.isDragging}
        >
          {!isEdit && (
            <TaskText onClick={toggleEdit}>
              {currentContent.trim().length > 0
                ? currentContent
                : "Enter task description"}
            </TaskText>
          )}
          {isEdit && (
            <textarea
              cols={40}
              rows={4}
              onKeyDown={handleSubmit}
              ref={textAreaRef}
              value={currentContent}
              onChange={handleInput}
            ></textarea>
          )}
          <CloseButton onClick={() => handleDelete(id)}>x</CloseButton>
          <TaskId>Task ID: {id}</TaskId>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Task;
