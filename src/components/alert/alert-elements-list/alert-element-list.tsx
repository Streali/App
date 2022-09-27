import { Milliseconds } from '../../../types/types/custom';
import { timeToPixel } from '../../../utils/timeline/time-converter';
import { Button, ButtonColor, ButtonSize } from '../../button/button';
import { Color } from '../../forms/color/color';
import { Duration } from '../duration/duration';
import { Timeline } from '../timeline/timeline';
import { DragDropContext, DropResult, Droppable, Draggable } from '@hello-pangea/dnd';

export interface AlertElementsListProps {
  elements: any[];
  totalTime: Milliseconds;
  onDeleteElement?: (id: string) => void;
  onColorChange?: (id: string, color: string) => void;
  onStartChange?: (id: string, startTime: Milliseconds) => void;
  onDurationChange?: (id: string, duration: Milliseconds) => void;
  onOrderChange?: (elements: any[]) => void;
}

export const AlertElementsList = (props: AlertElementsListProps) => {
  const {
    elements,
    totalTime,
    onDeleteElement,
    onColorChange,
    onDurationChange,
    onStartChange,
    onOrderChange,
  } = props;

  const onDragEnd = (result: DropResult) => {
    console.log('end', result);
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const currentList = [...elements];
    const elementToMove = currentList[source.index];
    currentList.splice(source.index, 1);
    currentList.splice(destination.index, 0, elementToMove);
    onOrderChange && onOrderChange(currentList);
  };

  return (
    <div className="custom-scrollbar h-[300px] w-full overflow-y-auto rounded-xl bg-dark-600">
      <div>
        <Duration totalTime={totalTime} />
      </div>
      <DragDropContext
        onDragEnd={(result: DropResult) => onDragEnd(result)}
        onDragStart={(start) => console.log('start', start)}
      >
        <Droppable droppableId="list">
          {(providedDroppable) => (
            <div
              className="flex flex-col gap-1"
              ref={providedDroppable.innerRef}
              {...providedDroppable.droppableProps}
            >
              <>
                {[...elements].reverse().map((element, index) => (
                  <Draggable draggableId={element.id} index={index} key={element.id}>
                    {(providedDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        className="flex items-center gap-2 border-b border-dark-400 py-2 pl-4"
                        style={{ width: timeToPixel(totalTime) + 171 + 'px' }}
                      >
                        <div className="flex h-12 items-center gap-2">
                          <Button
                            buttonIcon="delete-bin-line"
                            color={ButtonColor.Error}
                            size={ButtonSize.Small}
                            onClick={() => onDeleteElement && onDeleteElement(element.id)}
                          />
                          <Button
                            buttonIcon="menu-5-line"
                            color={ButtonColor.Dark}
                            size={ButtonSize.Small}
                            type="button"
                          />
                          <Color
                            haveInput={false}
                            onColorChange={(value) =>
                              onColorChange && onColorChange(element.id, value)
                            }
                          />
                        </div>
                        <Timeline
                          type={element.type}
                          id={element.id}
                          title={element.title}
                          totalTime={totalTime}
                          color={element.color}
                          duration={element.duration}
                          startTime={element.startTime}
                          onElementMove={(startTime) =>
                            onStartChange && onStartChange(element.id, startTime)
                          }
                          onElementResize={(duration) =>
                            onDurationChange && onDurationChange(element.id, duration)
                          }
                        />
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
