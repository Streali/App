import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Pixels } from '../../../types/types/custom';
import { Button, ButtonSize } from '../../button/button';
import { Editor } from '../editor/editor';

export interface AlertEditorContainerProps {
  width: Pixels;
  height: Pixels;
  elements: any[];
}

export const AlertEditorContainer = (props: AlertEditorContainerProps) => {
  const { width, height, elements } = props;

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div className="relative h-[524px] overflow-hidden rounded-2xl bg-black">
      <TransformWrapper
        initialScale={0.5}
        minScale={0.2}
        maxScale={10}
        centerOnInit
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
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};
