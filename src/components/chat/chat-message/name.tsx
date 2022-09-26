import { NameChat, TwitchBadge } from '../../../types/schemas/chat';

export interface NameProps {
  settings: NameChat;
  name: React.ReactNode;
  badges: TwitchBadge;
}

export const Name = (props: NameProps) => {
  const { settings, name, badges } = props;

  const nameStyle: React.CSSProperties = {
    width: settings.full_width ? '100%' : 'auto',
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
    margin: `${settings.margin.top}px ${settings.margin.right}px ${settings.margin.bottom}px ${settings.margin.left}px`,
    padding: `${settings.padding.top}px ${settings.padding.right}px ${settings.padding.bottom}px ${settings.padding.left}px`,
    borderRadius: `${settings.radius.top_left}px ${settings.radius.top_right}px ${settings.radius.bottom_right}px ${settings.radius.bottom_left}px`,
  };

  const badgesStyle: React.CSSProperties = {
    gap: settings.badges.space_between + 'px',
  };

  const badgeContent = (
    <div style={badgesStyle} className="flex">
      {Object.entries(badges).map(([key, value]) => {
        if (value) {
          return (
            value && (
              <img
                key={key}
                style={{ width: settings.badges.size + 'px' }}
                src={`/badges/${settings.badges.style}/${key}.png`}
              />
            )
          );
        }
      })}
    </div>
  );

  const haveBadges = () => {
    return (
      badges.admin ||
      badges.broadcaster ||
      badges.moderator ||
      badges.partner ||
      badges.vip ||
      badges.artist
    );
  };

  return (
    <div style={nameStyle} className="shrink-0">
      <div
        className="flex items-center"
        style={{
          gap: haveBadges() ? settings.badges.space + 'px' : '0px',
          justifyContent:
            settings.text.textAlign === 'left'
              ? 'start'
              : settings.text.textAlign === 'center'
              ? 'center'
              : 'end',
        }}>
        {settings.badges.enabled && settings.badges.position === 'left' && badgeContent}
        {name}
        {settings.badges.enabled && settings.badges.position === 'right' && badgeContent}
      </div>
    </div>
  );
};
