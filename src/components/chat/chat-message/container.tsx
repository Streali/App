import { motion } from 'framer-motion';
import { ChatTheme } from '~/types/schemas/chat';
import { selectAnimation } from '~/utils/common/animations';
import type { CSSProperties } from 'react';

export interface ContainerProps {
  settings: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme;
  children: React.ReactNode;
  color?: string;
}

export const Container = (props: ContainerProps) => {
  const { settings, children, color } = props;

  const containerStyle: CSSProperties = {
    flexDirection: settings.global.layout === 'stack' ? 'column' : 'row',
    width: settings.container.full_width ? '100%' : 'fit-content',
    background:
      settings.container.background_twitch_color && color ? color : settings.container.background,
    boxShadow: `${settings.container.shadow.shadowOffsetX}px ${settings.container.shadow.shadowOffsetY}px ${settings.container.shadow.shadowBlur}px ${settings.container.shadow.shadowColor}`,
    borderTop: `${settings.container.border.top.width}px ${settings.container.border.top.style} ${settings.container.border.top.color}`,
    borderRight: `${settings.container.border.right.width}px ${settings.container.border.right.style} ${settings.container.border.right.color}`,
    borderBottom: `${settings.container.border.bottom.width}px ${settings.container.border.bottom.style} ${settings.container.border.bottom.color}`,
    borderLeft: `${settings.container.border.left.width}px ${settings.container.border.left.style} ${settings.container.border.left.color}`,
    margin: `${settings.container.margin.top}px ${settings.container.margin.right}px ${settings.container.margin.bottom}px ${settings.container.margin.left}px`,
    padding: `${settings.container.padding.top}px ${settings.container.padding.right}px ${settings.container.padding.bottom}px ${settings.container.padding.left}px`,
    borderRadius: `${settings.container.radius.top_left}px ${settings.container.radius.top_right}px ${settings.container.radius.bottom_right}px ${settings.container.radius.bottom_left}px`,
    alignItems:
      settings.global.alignment === 'left'
        ? 'flex-start'
        : settings.global.alignment === 'right'
        ? 'flex-end'
        : ('center' as 'flex-start' | 'flex-end' | 'center'),
    marginBottom: settings.global.space_between_messages + 'px',
  };

  return (
    <motion.div
      animate={selectAnimation(settings.global.animation).animate}
      initial={selectAnimation(settings.global.animation).initial}
      transition={selectAnimation(settings.global.animation).transition}
      className="flex"
      style={containerStyle}
    >
      {children}
    </motion.div>
  );
};
