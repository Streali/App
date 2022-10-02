import { useEffect } from 'react';
import type { AlertElementTextSettings } from '../../../types/schemas/alert';
import { Pixels } from '../../../types/types/custom';

export interface AlertTextProps {
  settings: AlertElementTextSettings;
  width: Pixels;
  height: Pixels;
  posX: Pixels;
  posY: Pixels;
  id: string;
}

export const AlertText = (props: AlertTextProps) => {
  const { settings, width, height, posX, posY, id } = props;

  useEffect(() => {
    (async () => {
      const WebFont = await import('webfontloader');
      WebFont.load({
        google: {
          families: [settings.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950'],
        },
      });
    })();
  }, [settings]);

  return (
    <p
      className="draggable-alert absolute hover:outline hover:outline-1 hover:outline-white/30"
      style={{
        width: width,
        height: height,
        transform: `translate(${posX}px, ${posY}px)`,
        fontFamily: settings.text.fontFamily,
        fontSize: settings.text.fontSize + 'px',
        fontWeight: settings.text.fontWeight,
        color: settings.text.color,
        textAlign: settings.text.textAlign as 'left' | 'center' | 'right',
        textDecoration: settings.text.textDecoration,
        fontStyle: settings.text.fontStyle,
        letterSpacing: settings.text.letterSpacing + 'px',
        lineHeight: settings.text.lineHeight + '%',
        textShadow: `${settings.text.textShadow.shadowOffsetX}px ${settings.text.textShadow.shadowOffsetY}px ${settings.text.textShadow.shadowBlur}px ${settings.text.textShadow.shadowColor}`,
        background: settings.background,
        boxShadow: `${settings.shadow.shadowOffsetX}px ${settings.shadow.shadowOffsetY}px ${settings.shadow.shadowBlur}px ${settings.shadow.shadowColor}`,
        borderTop: `${settings.border.top.width}px ${settings.border.top.style} ${settings.border.top.color}`,
        borderRight: `${settings.border.right.width}px ${settings.border.right.style} ${settings.border.right.color}`,
        borderBottom: `${settings.border.bottom.width}px ${settings.border.bottom.style} ${settings.border.bottom.color}`,
        borderLeft: `${settings.border.left.width}px ${settings.border.left.style} ${settings.border.left.color}`,
        padding: `${settings.padding.top}px ${settings.padding.right}px ${settings.padding.bottom}px ${settings.padding.left}px`,
        borderRadius: `${settings.radius.top_left}px ${settings.radius.top_right}px ${settings.radius.bottom_right}px ${settings.radius.bottom_left}px`,
      }}
      data-x={posX}
      data-y={posY}
      data-id={id}
    >
      {settings.is_dynamic ? settings.dynamic_content : settings.content}
    </p>
  );
};
