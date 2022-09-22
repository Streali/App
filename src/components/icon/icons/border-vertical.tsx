import { IconSVGProps } from '../icon';

export const IconBorderVertical = (props: IconSVGProps) => {
  const { width = 24, height = 24, className = '', fill = '#fff' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      className={className}>
      <g fill={fill} clipPath="url(#clip0_809_1897)">
        <path d="M21 5V3H3v2h18zM21 21v-2H3v2h18zM21 17v-2h-2v2h2zM21 13v-2h-2v2h2zM17 13v-2h-2v2h2zM13 13v-2h-2v2h2zM13 9V7h-2v2h2zM13 17v-2h-2v2h2zM9 13v-2H7v2h2zM5 13v-2H3v2h2zM5 17v-2H3v2h2zM5 9V7H3v2h2zM21 9V7h-2v2h2z"></path>
      </g>
      <defs>
        <clipPath id="clip0_809_1897">
          <path fill={fill} d="M0 0H18V18H0z" transform="rotate(90 9 12)"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
