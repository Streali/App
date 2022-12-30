import { Label } from '~/types/schemas/label';

export const defaultLabel: Label = {
  title: 'Last subscriber',
  container: {
    full_width: false,
    background: '#ffffff00',
    alignment: 'right',
    shadow: {
      shadowColor: '#000000',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
    },
    border: {
      top: {
        color: '#00000000',
        width: 0,
        style: 'solid',
      },
      right: {
        color: '#00000000',
        width: 0,
        style: 'solid',
      },
      bottom: {
        color: '#00000000',
        width: 0,
        style: 'solid',
      },
      left: {
        color: '#00000000',
        width: 0,
        style: 'solid',
      },
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
  },
  label: {
    show: true,
    full_width: false,
    content: 'Last subscriber',
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
      textShadow: {
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: '#000000',
      },
    },
    background: '#ffffff',
    shadow: {
      shadowColor: '#000000',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
    },
    border: {
      top: {
        color: '#000000',
        width: 1,
        style: 'solid',
      },
      right: {
        color: '#000000',
        width: 1,
        style: 'solid',
      },
      bottom: {
        color: '#000000',
        width: 1,
        style: 'solid',
      },
      left: {
        color: '#000000',
        width: 1,
        style: 'solid',
      },
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
  value: {
    full_width: false,
    border: {
      top: {
        color: '#000000',
        width: 1,
        style: 'solid',
      },
      right: {
        color: '#000000',
        width: 1,
        style: 'solid',
      },
      bottom: {
        color: '#000000',
        width: 1,
        style: 'solid',
      },
      left: {
        color: '#000000',
        width: 1,
        style: 'solid',
      },
    },
    content: '{{last subscriber}}',
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
      textShadow: {
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: '#000000',
      },
    },
    background: '#ffffff',
    shadow: {
      shadowColor: '#000000',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
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
    accent: {
      fontFamily: 'Rubik',
      fontSize: 16,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'left',
      textDecoration: 'none',
      fontStyle: 'normal',
      letterSpacing: 0,
      lineHeight: 100,
      textShadow: {
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: '#000000',
      },
    },
  },
  order: [
    {
      id: 'label',
      name: 'Line 1',
    },
    {
      id: 'value',
      name: 'Line 2',
    },
  ],
  layout: 'stack',
};
