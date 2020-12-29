import React, { useState, useRef, useEffect } from "react";
import { Wrapper, CloseButton, TaskId, TaskText } from "./styles";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { DELETE_TASK, UPDATE_TASK_CONTENT } from "store/actions";

export interface ITask {
  id: string;
  content: string;
  index?: number;
}

const Task: React.FC<ITask> = ({ id, content, index }) => {
  const [isEdit, setEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log(textAreaRef.current);
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [textAreaRef, isEdit]);

  useEffect(() => {
    if (currentContent.trim().length === 0 && !isEdit)
      setCurrentContent("Enter task description");

    if (currentContent === "Enter task description" && isEdit) {
      setCurrentContent("");
    }
  }, [currentContent, isEdit]);

  const handleDelete = (id: ITask["id"]) => {
    dispatch({ type: DELETE_TASK, payload: id });
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
      {(provided) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {!isEdit && (
            <TaskText onClick={toggleEdit}>{currentContent}</TaskText>
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
