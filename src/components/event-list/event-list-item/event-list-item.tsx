import { EventList } from '~/types/schemas/event-list';

type EventListItemProps = {
  theme: EventList;
  type:
    | 'follow'
    | 'cheer'
    | 'subscribe'
    | 'subscription_gift'
    | 'raid'
    | 'hype_train_begin'
    | 'hype_train_end'
    | 'goal_begin'
    | 'goal_end';
};

const EventListItem = (props: EventListItemProps) => {
  const { theme, type } = props;

  const computedType = theme.events.modify_all ? 'all' : type;

  const containerStyle = {
    backgroundColor: theme.events.styles[computedType].container.background,
    borderTop: `${theme.events.styles[computedType].container.border.top.width}px ${theme.events.styles[computedType].container.border.top.style} ${theme.events.styles[computedType].container.border.top.color}`,
    borderRight: `${theme.events.styles[computedType].container.border.right.width}px ${theme.events.styles[computedType].container.border.right.style} ${theme.events.styles[computedType].container.border.right.color}`,
    borderBottom: `${theme.events.styles[computedType].container.border.bottom.width}px ${theme.events.styles[computedType].container.border.bottom.style} ${theme.events.styles[computedType].container.border.bottom.color}`,
    borderLeft: `${theme.events.styles[computedType].container.border.left.width}px ${theme.events.styles[computedType].container.border.left.style} ${theme.events.styles[computedType].container.border.left.color}`,
    margin: `${theme.events.styles[computedType].container.margin.top}px ${theme.events.styles[computedType].container.margin.right}px ${theme.events.styles[computedType].container.margin.bottom}px ${theme.events.styles[computedType].container.margin.left}px`,
    padding: `${theme.events.styles[computedType].container.padding.top}px ${theme.events.styles[computedType].container.padding.right}px ${theme.events.styles[computedType].container.padding.bottom}px ${theme.events.styles[computedType].container.padding.left}px`,
    borderRadius: `${theme.events.styles[computedType].container.radius.top_left}px ${theme.events.styles[computedType].container.radius.top_right}px ${theme.events.styles[computedType].container.radius.bottom_right}px ${theme.events.styles[computedType].container.radius.bottom_left}px`,
    boxShadow: `${theme.events.styles[computedType].container.shadow.shadowOffsetX}px ${theme.events.styles[computedType].container.shadow.shadowOffsetY}px ${theme.events.styles[computedType].container.shadow.shadowBlur}px ${theme.events.styles[computedType].container.shadow.shadowColor}`,
  };

  const nameStyle = {
    fontFamily: theme.events.styles[computedType].name.text_style.fontFamily,
    fontSize: theme.events.styles[computedType].name.text_style.fontSize + 'px',
    fontWeight: theme.events.styles[computedType].name.text_style.fontWeight,
    color: theme.events.styles[computedType].name.text_style.color,
    textAlign: theme.events.styles[computedType].name.text_style.textAlign as
      | 'left'
      | 'center'
      | 'right',
    textDecoration: theme.events.styles[computedType].name.text_style.textDecoration,
    fontStyle: theme.events.styles[computedType].name.text_style.fontStyle,
    letterSpacing: theme.events.styles[computedType].name.text_style.letterSpacing + 'px',
    lineHeight: theme.events.styles[computedType].name.text_style.lineHeight + '%',
    textShadow: `${theme.events.styles[computedType].name.text_style.textShadow.shadowOffsetX}px ${theme.events.styles[computedType].name.text_style.textShadow.shadowOffsetY}px ${theme.events.styles[computedType].name.text_style.textShadow.shadowBlur}px ${theme.events.styles[computedType].name.text_style.textShadow.shadowColor}`,
    backgroundColor: theme.events.styles[computedType].name.background,
    borderTop: `${theme.events.styles[computedType].name.border.top.width}px ${theme.events.styles[computedType].name.border.top.style} ${theme.events.styles[computedType].name.border.top.color}`,
    borderRight: `${theme.events.styles[computedType].name.border.right.width}px ${theme.events.styles[computedType].name.border.right.style} ${theme.events.styles[computedType].name.border.right.color}`,
    borderBottom: `${theme.events.styles[computedType].name.border.bottom.width}px ${theme.events.styles[computedType].name.border.bottom.style} ${theme.events.styles[computedType].name.border.bottom.color}`,
    borderLeft: `${theme.events.styles[computedType].name.border.left.width}px ${theme.events.styles[computedType].name.border.left.style} ${theme.events.styles[computedType].name.border.left.color}`,
    margin: `${theme.events.styles[computedType].name.margin.top}px ${theme.events.styles[computedType].name.margin.right}px ${theme.events.styles[computedType].name.margin.bottom}px ${theme.events.styles[computedType].name.margin.left}px`,
    padding: `${theme.events.styles[computedType].name.padding.top}px ${theme.events.styles[computedType].name.padding.right}px ${theme.events.styles[computedType].name.padding.bottom}px ${theme.events.styles[computedType].name.padding.left}px`,
    borderRadius: `${theme.events.styles[computedType].name.radius.top_left}px ${theme.events.styles[computedType].name.radius.top_right}px ${theme.events.styles[computedType].name.radius.bottom_right}px ${theme.events.styles[computedType].name.radius.bottom_left}px`,
    boxShadow: `${theme.events.styles[computedType].name.shadow.shadowOffsetX}px ${theme.events.styles[computedType].name.shadow.shadowOffsetY}px ${theme.events.styles[computedType].name.shadow.shadowBlur}px ${theme.events.styles[computedType].name.shadow.shadowColor}`,
  };

  const messageStyle = {
    fontFamily: theme.events.styles[computedType].message.text_style.fontFamily,
    fontSize: theme.events.styles[computedType].message.text_style.fontSize + 'px',
    fontWeight: theme.events.styles[computedType].message.text_style.fontWeight,
    color: theme.events.styles[computedType].message.text_style.color,
    textAlign: theme.events.styles[computedType].message.text_style.textAlign as
      | 'left'
      | 'center'
      | 'right',
    textDecoration: theme.events.styles[computedType].message.text_style.textDecoration,
    fontStyle: theme.events.styles[computedType].message.text_style.fontStyle,
    letterSpacing: theme.events.styles[computedType].message.text_style.letterSpacing + 'px',
    lineHeight: theme.events.styles[computedType].message.text_style.lineHeight + '%',
    textShadow: `${theme.events.styles[computedType].message.text_style.textShadow.shadowOffsetX}px ${theme.events.styles[computedType].message.text_style.textShadow.shadowOffsetY}px ${theme.events.styles[computedType].message.text_style.textShadow.shadowBlur}px ${theme.events.styles[computedType].message.text_style.textShadow.shadowColor}`,
    backgroundColor: theme.events.styles[computedType].message.background,
    borderTop: `${theme.events.styles[computedType].message.border.top.width}px ${theme.events.styles[computedType].message.border.top.style} ${theme.events.styles[computedType].message.border.top.color}`,
    borderRight: `${theme.events.styles[computedType].message.border.right.width}px ${theme.events.styles[computedType].message.border.right.style} ${theme.events.styles[computedType].message.border.right.color}`,
    borderBottom: `${theme.events.styles[computedType].message.border.bottom.width}px ${theme.events.styles[computedType].message.border.bottom.style} ${theme.events.styles[computedType].message.border.bottom.color}`,
    borderLeft: `${theme.events.styles[computedType].message.border.left.width}px ${theme.events.styles[computedType].message.border.left.style} ${theme.events.styles[computedType].message.border.left.color}`,
    margin: `${theme.events.styles[computedType].message.margin.top}px ${theme.events.styles[computedType].message.margin.right}px ${theme.events.styles[computedType].message.margin.bottom}px ${theme.events.styles[computedType].message.margin.left}px`,
    padding: `${theme.events.styles[computedType].message.padding.top}px ${theme.events.styles[computedType].message.padding.right}px ${theme.events.styles[computedType].message.padding.bottom}px ${theme.events.styles[computedType].message.padding.left}px`,
    borderRadius: `${theme.events.styles[computedType].message.radius.top_left}px ${theme.events.styles[computedType].message.radius.top_right}px ${theme.events.styles[computedType].message.radius.bottom_right}px ${theme.events.styles[computedType].message.radius.bottom_left}px`,
    boxShadow: `${theme.events.styles[computedType].message.shadow.shadowOffsetX}px ${theme.events.styles[computedType].message.shadow.shadowOffsetY}px ${theme.events.styles[computedType].message.shadow.shadowBlur}px ${theme.events.styles[computedType].message.shadow.shadowColor}`,
  };

  return (
    <div style={containerStyle} className="flex">
      <div style={nameStyle}>Name</div>
      <div style={messageStyle}>Message</div>
    </div>
  );
};

export default EventListItem;
