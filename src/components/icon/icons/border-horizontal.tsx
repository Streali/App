import { IconSVGProps } from '../icon';

export const IconBorderHorizontal = (props: IconSVGProps) => {
  const { width = 24, height = 24, className = '', fill = '#fff' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      className={className}>
      <g fill={fill} clipPath="url(#clip0_809_1865)">
        <path d="M5 3H3v18h2V3zM21 3h-2v18h2V3zM17 3h-2v2h2V3zM13 3h-2v2h2V3zM13 7h-2v2h2V7zM13 11h-2v2h2v-2zM9 11H7v2h2v-2zM17 11h-2v2h2v-2zM13 15h-2v2h2v-2zM13 19h-2v2h2v-2zM17 19h-2v2h2v-2zM9 19H7v2h2v-2zM9 3H7v2h2V3z"></path>
      </g>
      <defs>
        <clipPath id="clip0_809_1865">
          <path fill={fill} d="M0 0H18V18H0z" transform="translate(3 3)"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
