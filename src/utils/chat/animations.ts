export const none = {
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  initial: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  transition: {
    duration: 0,
  },
};

export const fadeInLeft = {
  animate: {
    x: 0,
    opacity: 1,
  },
  initial: {
    x: -100,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
};

export const fadeInRight = {
  animate: {
    x: 0,
    opacity: 1,
  },
  initial: {
    x: 100,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
};

export const fadeInUp = {
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
  },
  initial: {
    y: 100,
    x: 0,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
};

export const fadeInBottom = {
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
  },
  initial: {
    y: -50,
    x: 0,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
};

export const ThreeSixtyNoScope = {
  animate: {
    rotate: 360,
  },
  initial: {
    rotate: 0,
  },
  transition: {
    duration: 0.3,
  },
};

export const selectAnimation = (animation: string) => {
  switch (animation) {
    case 'none':
      return none;
    case 'fade-in-left':
      return fadeInLeft;
    case 'fade-in-right':
      return fadeInRight;
    case 'fade-in-up':
      return fadeInUp;
    case 'fade-in-bottom':
      return fadeInBottom;
    case '360-no-scope':
      return ThreeSixtyNoScope;
    default:
      return fadeInLeft;
  }
};

export const animationList = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'Fade In Left',
    value: 'fade-in-left',
  },
  {
    label: 'Fade In Right',
    value: 'fade-in-right',
  },
  {
    label: 'Fade In Up',
    value: 'fade-in-up',
  },
  {
    label: 'Fade In Bottom',
    value: 'fade-in-bottom',
  },
  {
    label: '360 No Scope',
    value: '360-no-scope',
  },
];
