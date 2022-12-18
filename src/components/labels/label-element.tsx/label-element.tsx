import { CSSProperties } from 'react';
import { Label } from '~/types/schemas/label';
import { LabelValueToText } from '~/utils/label/label-value-to-text';

interface LabelElementProps {
  theme: Label;
}

const LabelElement = (props: LabelElementProps) => {
  const { theme } = props;
  const container = useRef<HTMLDivElement>(null);

  const containerStyle: CSSProperties = {
    //flexDirection: theme.global.layout === 'stack' ? 'column' : 'row',
    width: theme.container.full_width ? '100%' : 'fit-content',
    background: theme.container.background,
    boxShadow: `${theme.container.shadow.shadowOffsetX}px ${theme.container.shadow.shadowOffsetY}px ${theme.container.shadow.shadowBlur}px ${theme.container.shadow.shadowColor}`,
    borderTop: `${theme.container.border.top.width}px ${theme.container.border.top.style} ${theme.container.border.top.color}`,
    borderRight: `${theme.container.border.right.width}px ${theme.container.border.right.style} ${theme.container.border.right.color}`,
    borderBottom: `${theme.container.border.bottom.width}px ${theme.container.border.bottom.style} ${theme.container.border.bottom.color}`,
    borderLeft: `${theme.container.border.left.width}px ${theme.container.border.left.style} ${theme.container.border.left.color}`,
    margin: `${theme.container.margin.top}px ${theme.container.margin.right}px ${theme.container.margin.bottom}px ${theme.container.margin.left}px`,
    padding: `${theme.container.padding.top}px ${theme.container.padding.right}px ${theme.container.padding.bottom}px ${theme.container.padding.left}px`,
    borderRadius: `${theme.container.radius.top_left}px ${theme.container.radius.top_right}px ${theme.container.radius.bottom_right}px ${theme.container.radius.bottom_left}px`,
    alignItems:
      theme.container.alignment === 'left'
        ? 'flex-start'
        : theme.container.alignment === 'right'
        ? 'flex-end'
        : 'center',
  };

  const labelStyle: CSSProperties = {
    display: theme.label.show ? 'block' : 'none',
    fontFamily: theme.label.text.fontFamily,
    fontSize: theme.label.text.fontSize + 'px',
    fontWeight: theme.label.text.fontWeight,
    color: theme.label.text.color,
    textAlign: theme.label.text.textAlign as 'left' | 'center' | 'right',
    textDecoration: theme.label.text.textDecoration,
    fontStyle: theme.label.text.fontStyle,
    letterSpacing: theme.label.text.letterSpacing + 'px',
    lineHeight: theme.label.text.lineHeight + '%',
    textShadow: `${theme.label.text.textShadow.shadowOffsetX}px ${theme.label.text.textShadow.shadowOffsetY}px ${theme.label.text.textShadow.shadowBlur}px ${theme.label.text.textShadow.shadowColor}`,
    background: theme.label.background,
    boxShadow: `${theme.label.shadow.shadowOffsetX}px ${theme.label.shadow.shadowOffsetY}px ${theme.label.shadow.shadowBlur}px ${theme.label.shadow.shadowColor}`,
    borderTop: `${theme.label.border.top.width}px ${theme.label.border.top.style} ${theme.label.border.top.color}`,
    borderRight: `${theme.label.border.right.width}px ${theme.label.border.right.style} ${theme.label.border.right.color}`,
    borderBottom: `${theme.label.border.bottom.width}px ${theme.label.border.bottom.style} ${theme.label.border.bottom.color}`,
    borderLeft: `${theme.label.border.left.width}px ${theme.label.border.left.style} ${theme.label.border.left.color}`,
    margin: `${theme.label.margin.top}px ${theme.label.margin.right}px ${theme.label.margin.bottom}px ${theme.label.margin.left}px`,
    padding: `${theme.label.padding.top}px ${theme.label.padding.right}px ${theme.label.padding.bottom}px ${theme.label.padding.left}px`,
    borderRadius: `${theme.label.radius.top_left}px ${theme.label.radius.top_right}px ${theme.label.radius.bottom_right}px ${theme.label.radius.bottom_left}px`,
  };

  const valueStyle: CSSProperties = {
    fontFamily: theme.value.text.fontFamily,
    fontSize: theme.value.text.fontSize + 'px',
    fontWeight: theme.value.text.fontWeight,
    color: theme.value.text.color,
    textAlign: theme.value.text.textAlign as 'left' | 'center' | 'right',
    textDecoration: theme.value.text.textDecoration,
    fontStyle: theme.value.text.fontStyle,
    letterSpacing: theme.label.text.letterSpacing + 'px',
    lineHeight: theme.value.text.lineHeight + '%',
    textShadow: `${theme.value.text.textShadow.shadowOffsetX}px ${theme.value.text.textShadow.shadowOffsetY}px ${theme.value.text.textShadow.shadowBlur}px ${theme.value.text.textShadow.shadowColor}`,
    background: theme.value.background,
    boxShadow: `${theme.value.shadow.shadowOffsetX}px ${theme.value.shadow.shadowOffsetY}px ${theme.value.shadow.shadowBlur}px ${theme.value.shadow.shadowColor}`,
    borderTop: `${theme.value.border.top.width}px ${theme.value.border.top.style} ${theme.value.border.top.color}`,
    borderRight: `${theme.value.border.right.width}px ${theme.value.border.right.style} ${theme.value.border.right.color}`,
    borderBottom: `${theme.value.border.bottom.width}px ${theme.value.border.bottom.style} ${theme.label.border.bottom.color}`,
    borderLeft: `${theme.value.border.left.width}px ${theme.value.border.left.style} ${theme.value.border.left.color}`,
    margin: `${theme.value.margin.top}px ${theme.value.margin.right}px ${theme.value.margin.bottom}px ${theme.value.margin.left}px`,
    padding: `${theme.value.padding.top}px ${theme.value.padding.right}px ${theme.value.padding.bottom}px ${theme.value.padding.left}px`,
    borderRadius: `${theme.value.radius.top_left}px ${theme.value.radius.top_right}px ${theme.value.radius.bottom_right}px ${theme.value.radius.bottom_left}px`,
  };

  useLayoutEffect(() => {
    if (container && container.current) {
      const spans = container.current.querySelectorAll('span');
      spans.forEach((span) => {
        span.style.color = theme.value.accent.color;
        span.style.fontFamily = theme.value.accent.fontFamily;
        span.style.fontSize = theme.value.accent.fontSize + 'px';
        span.style.fontWeight = theme.value.accent.fontWeight;
        span.style.textAlign = theme.value.accent.textAlign as 'left' | 'center' | 'right';
        span.style.textDecoration = theme.value.accent.textDecoration;
        span.style.fontStyle = theme.value.accent.fontStyle;
        span.style.letterSpacing = theme.value.accent.letterSpacing + 'px';
        span.style.lineHeight = theme.value.accent.lineHeight + '%';
        span.style.textShadow = `${theme.value.accent.textShadow.shadowOffsetX}px ${theme.value.accent.textShadow.shadowOffsetY}px ${theme.value.accent.textShadow.shadowBlur}px ${theme.value.accent.textShadow.shadowColor}`;
      });
    }
  }, [theme, container]);

  return (
    <div style={containerStyle} className="flex flex-col" ref={container}>
      {theme.order.map((item) => (
        <>
          {item.id === 'label' && <div style={labelStyle}>{theme.label.content}</div>}
          {item.id === 'value' && (
            <div
              style={valueStyle}
              dangerouslySetInnerHTML={{ __html: LabelValueToText(theme.value.content) }}
            ></div>
          )}
        </>
      ))}
    </div>
  );
};

export default LabelElement;
