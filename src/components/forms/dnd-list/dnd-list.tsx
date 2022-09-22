import { Icon } from '../../icon/icon';
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { OrderType } from '../../../types/schemas/components';
export interface DnDListProps {
  className?: string;
  elements: OrderType;
  onChange?: (elements: OrderType) => void;
}

export const DnDList = (props: DnDListProps) => {
  const { elements, className = '', onChange } = props;
  const [list, setList] = useState(elements);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const currentList = [...list];
    const elementToMove = currentList[source.index];
    currentList.splice(source.index, 1);
    currentList.splice(destination.index, 0, elementToMove);
    setList(currentList);
    onChange && onChange(currentList);
  };

  return (
    <div className={className}>
      <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
        <Droppable droppableId="list">
          {(providedDroppable) => (
            <div
              className="flex flex-col gap-1"
              ref={providedDroppable.innerRef}
              {...providedDroppable.droppableProps}>
              <>
                {list.map((element, index) => (
                  <Draggable draggableId={index.toString()} index={index} key={index}>
                    {(providedDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        className="h-10 px-3 bg-dark-400 rounded-lg flex gap-3 items-center">
                        <Icon name="menu-5-line" />
                        <p className="text-sm">{element.name}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
              </>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
