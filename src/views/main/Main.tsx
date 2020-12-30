import React from "react";
import { Wrapper } from "./styles/index";
import Column, { IColumn } from "components/column/Column";
import Button from "components/button/Button";
import { initialData } from "store/initialState";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { ADD_TASK, UPDATE_COLUMNS } from "store/actions";

const Main: React.FC = () => {
  const { columns } = useSelector((state: RootStateOrAny) => state);
  const dispatch = useDispatch();
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
      dispatch({ type: UPDATE_COLUMNS, payload: newColumn });
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
      dispatch({ type: UPDATE_COLUMNS, payload: newSourceColumn });
      dispatch({ type: UPDATE_COLUMNS, payload: newDestinationColumn });
    }
  };

  const handleAddTask = (columnId: IColumn["id"]) => {
    dispatch({
      type: ADD_TASK,
      payload: {
        columnId,
      },
    });
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {initialData.columnLayout.map((column) => {
          return (
            <Column
              key={column}
              header={columns[column].header}
              taskIds={columns[column].taskIds}
              id={column}
            >
              <Button
                color="green"
                label="+"
                clickHandler={() => handleAddTask(column)}
              />
            </Column>
          );
        })}
      </DragDropContext>
    </Wrapper>
  );
};

export default Main;
