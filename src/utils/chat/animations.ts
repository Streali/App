export const none = {
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
  },
  initial: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  transition: {
    duration: 0.3,
  },
};

export const fadeInLeft = {
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
  },
  initial: {
    x: '-100px',
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    stiffness: 100,
    ease: 'easeInOut',
    type: 'spring',
    damping: 8,
  },
};

export const fadeInLeftOut = {
  animate: {
    x: '-50px',
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    stiffness: 100,
    ease: 'easeInOut',
    type: 'spring',
  },
};

export const fadeInRight = {
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
  },
  initial: {
    x: 100,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
};

export const fadeInRightOut = {
  animate: {
    x: '50px',
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    stiffness: 100,
    ease: 'easeInOut',
    type: 'spring',
  },
};

export const fadeInUp = {
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
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

export const fadeInUpOut = {
  animate: {
    x: '0px',
    y: '-50px',
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    stiffness: 100,
    ease: 'easeInOut',
    type: 'spring',
  },
};

export const fadeInBottom = {
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
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

export const fadeInBottomOut = {
  animate: {
    x: '0px',
    y: '50px',
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    stiffness: 100,
    ease: 'easeInOut',
    type: 'spring',
  },
};

export const ThreeSixtyNoScope = {
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
  },
  initial: {
    rotate: 360,
  },
  transition: {
    duration: 0.3,
  },
};

export const ThreeSixtyNoScopeOut = {
  animate: {
    rotate: -360,
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    stiffness: 100,
    ease: 'easeInOut',
    type: 'spring',
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

export const selectAnimationOut = (animation: string) => {
  switch (animation) {
    case 'none':
      return none;
    case 'fade-in-left':
      return fadeInLeftOut;
    case 'fade-in-right':
      return fadeInRightOut;
    case 'fade-in-up':
      return fadeInUpOut;
    case 'fade-in-bottom':
      return fadeInBottomOut;
    case '360-no-scope':
      return ThreeSixtyNoScopeOut;
    default:
      return fadeInLeftOut;
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
