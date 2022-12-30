import type { ChatTheme } from '~/types/schemas/chat';

export const defaultChatTheme: Omit<ChatTheme, 'user_id' | 'id'> | ChatTheme = {
  title: 'Chat theme title',
  global: {
    space_between_messages: 24,
    alignment: 'right',
    layout: 'stack',
    order: [
      { id: 'name', name: 'Name' },
      { id: 'message', name: 'Message' },
    ],
    animation: 'fade-in-left',
    developer_mode: false,
  },
  container: {
    full_width: false,
    background_twitch_color: false,
    background: '#ffffff00',
    shadow: {
      shadowColor: '#000000',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
    },
    border: {
      top: { color: '#00000000', width: 0, style: 'solid' },
      right: { color: '#00000000', width: 0, style: 'solid' },
      bottom: { color: '#00000000', width: 0, style: 'solid' },
      left: { color: '#00000000', width: 0, style: 'solid' },
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    radius: {
      top_left: 0,
      top_right: 0,
      bottom_right: 0,
      bottom_left: 0,
    },
    alignment: 'right',
  },
  name: {
    full_width: false,
    text_twitch_color: false,
    text: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'left',
      textDecoration: 'none',
      fontStyle: 'normal',
      letterSpacing: 0,
      lineHeight: 100,
      textShadow: { shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 0, shadowColor: '#000000' },
    },
    background_twitch_color: false,
    background: '#ffffff',
    shadow: {
      shadowColor: '#000000',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
    },
    border: {
      top: { color: '#000000', width: 1, style: 'solid' },
      right: { color: '#000000', width: 1, style: 'solid' },
      bottom: { color: '#000000', width: 1, style: 'solid' },
      left: { color: '#000000', width: 1, style: 'solid' },
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
    badges: {
      enabled: true,
      position: 'left',
      style: 'twitch',
      size: 12,
      space: 8,
      space_between: 4,
    },
  },
  message: {
    full_width: false,
    text_twitch_color: false,
    text: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: '400',
      color: '#000000',
      textAlign: 'left',
      textDecoration: 'none',
      fontStyle: 'normal',
      letterSpacing: 0,
      lineHeight: 100,
      textShadow: { shadowOffsetX: 0, shadowOffsetY: 0, shadowBlur: 0, shadowColor: '#000000' },
    },
    background_twitch_color: false,
    background: '#ffffff',
    shadow: {
      shadowColor: '#000000',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
    },
    border: {
      top: { color: '#000000', width: 1, style: 'solid' },
      right: { color: '#000000', width: 1, style: 'solid' },
      bottom: { color: '#000000', width: 1, style: 'solid' },
      left: { color: '#000000', width: 1, style: 'solid' },
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
  },
  code: {
    html: `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet">

<div class="message">
    <div class="name">
        {% if displayBadges.size > 0 %}
        <div class="badges">
            {% for badge in displayBadges %}
                <img src={{badge.url}}>
            {% endfor %}
        </div>
        {% endif %}
        {{username}}
    </div>
    <div class="content">
        {{message}}
    </div>
</div>
    `,
    css: `
.message {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    animation: pop 1s cubic-bezier(1, 0, 0, 1) both;
}

.name {
    background-color: white;
    display: inline-flex;
    color: black;
    align-items: center;
    gap: 8px;
    padding: 4px;
    border: 1px solid black;
    border-radius: 4px;
    font-family: 'Rubik';
    margin-bottom: 8px;
    width: fit-content;
    font-weight: 700;
    font-size: 14px;
}

.name .badges {
    display: flex;
    gap: 2px;
}

.name .badges img {
    width: 16px;
    height: 16px;
}

.content {
    background-color: white;
    display: inline-flex;
    color: black;
    align-items: center;
    gap: 8px;
    padding: 4px;
    border: 1px solid black;
    border-radius: 4px;
    font-family: 'Rubik';
    margin-bottom: 8px;
    width: fit-content;
    font-size: 14px;
}

@keyframes pop {
    0% {
        opacity: 0;
        left: 110%;
    }

    100% {
        opacity: 1;
        left: 0;
    }
}
    `,
  },
};
