import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { AlertElements } from '../../../types/schemas/alert';
import { Pixels } from '../../../types/types/custom';
import { Button, ButtonSize } from '../../button/button';
import { Editor } from '../editor/editor';

export interface AlertEditorContainerProps {
  width: Pixels;
  height: Pixels;
  elements: AlertElements;
  onElementMove?: (id: string, x: Pixels, y: Pixels) => void;
  onElementResize?: (id: string, width: Pixels, height: Pixels) => void;
  onElementClick?: (id: string) => void;
}

export const AlertEditorContainer = (props: AlertEditorContainerProps) => {
  const { width, height, elements, onElementMove, onElementResize, onElementClick } = props;

  const [isHover, setIsHover] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(0.5);

  return (
    <div className="relative h-[524px] overflow-hidden rounded-2xl bg-black">
      <TransformWrapper
        initialScale={0.5}
        minScale={0.2}
        maxScale={10}
        centerOnInit
        onZoom={(ref) => setZoom(ref.state.scale)}
        limitToBounds={false}
        panning={{ disabled: isHover }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-2 left-2 z-10 flex gap-2">
              <Button
                buttonIcon="zoom-in-line"
                size={ButtonSize.Very_Small}
                onClick={() => zoomIn()}
              />
              <Button
                buttonIcon="zoom-out-line"
                size={ButtonSize.Very_Small}
                onClick={() => zoomOut()}
              />
              <Button
                buttonIcon="restart-line"
                size={ButtonSize.Very_Small}
                onClick={() => resetTransform()}
              />
            </div>
            <TransformComponent wrapperClass="!w-full !h-full">
              <Editor
                width={width}
                height={height}
                isHover={(hover) => setIsHover(hover)}
                elements={elements}
                onElementMove={onElementMove}
                onElementResize={onElementResize}
                onElementClick={onElementClick}
                zoom={zoom}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
