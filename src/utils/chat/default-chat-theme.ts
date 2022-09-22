import { ChatTheme } from '../../types/schemas/chat';

export const defaultChatTheme: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme = {
  title: 'Chat theme title',
  global: {
    space_between_messages: 24,
    alignment: 'left',
    layout: 'stack',
    order: [
      { id: 'name', name: 'Name' },
      { id: 'message', name: 'Message' },
    ],
  },
  name: {
    text: {
      fontFamily: 'Roboto',
      fontSize: 12,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'left',
      textDecoration: 'none',
      fontStyle: 'normal',
      letterSpacing: 0,
      lineHeight: 100,
      textShadow: { shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 0, shadowColor: '#000000' },
    },
    background: '#ffffff',
    shadow: {
      shadowColor: '#000000',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
    },
    border: {
      top: { color: '#000000', width: 0, style: 'solid' },
      right: { color: '#000000', width: 0, style: 'solid' },
      bottom: { color: '#000000', width: 0, style: 'solid' },
      left: { color: '#000000', width: 0, style: 'solid' },
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    padding: {
      top: 6,
      right: 6,
      bottom: 6,
      left: 6,
    },
    radius: {
      top_left: 4,
      top_right: 4,
      bottom_right: 4,
      bottom_left: 4,
    },
    badges: {
      enabled: true,
      position: 'left',
      style: 'twitch',
      size: 12,
      space: 8,
      spaceBetween: 4,
    },
  },
  message: {
    text: {
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'left',
      textDecoration: 'none',
      fontStyle: 'normal',
      letterSpacing: 0,
      lineHeight: 100,
      textShadow: { shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 0, shadowColor: '#000000' },
    },
    background: '#ffffff',
    shadow: {
      shadowColor: '#000000',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
    },
    border: {
      top: { color: '#000000', width: 0, style: 'solid' },
      right: { color: '#000000', width: 0, style: 'solid' },
      bottom: { color: '#000000', width: 0, style: 'solid' },
      left: { color: '#000000', width: 0, style: 'solid' },
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 8,
      left: 0,
    },
    padding: {
      top: 6,
      right: 6,
      bottom: 6,
      left: 6,
    },
    radius: {
      top_left: 4,
      top_right: 4,
      bottom_right: 4,
      bottom_left: 4,
    },
  },
};
