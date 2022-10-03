import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Icon } from '~/components/icon/icon';
import type { DropResult } from '@hello-pangea/dnd';
import type { OrderType } from '~/types/schemas/components';

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
              {...providedDroppable.droppableProps}
            >
              <>
                {list.map((element, index) => (
                  <Draggable draggableId={element.id} index={index} key={element.id}>
                    {(providedDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        className="flex h-10 items-center gap-3 rounded-lg bg-dark-400 px-3"
                      >
                        <Icon name="menu-5-line" />
                        <p className="text-sm">{element.name}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
              </>
              {providedDroppable.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
