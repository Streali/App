import { IconSVGProps } from '../icon';

export const IconBorderRadiusBottomLeft = (props: IconSVGProps) => {
  const { width = 24, height = 24, className = '', fill = '#fff' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <mask
        id="mask0_762_2303"
        style={{ maskType: 'alpha' }}
        width="20"
        height="20"
        x="2"
        y="2"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill={fill}
          d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5zm3 15c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10c1.654 0 3 1.346 3 3v10z"
        ></path>
      </mask>
      <g mask="url(#mask0_762_2303)">
        <path fill={fill} d="M2 11H13V22H2z"></path>
      </g>
      <path
        fill={fill}
        fillOpacity="0.5"
        fillRule="evenodd"
        d="M7 2h10c2.757 0 5 2.243 5 5v10c0 2.757-2.243 5-5 5h-4v-2h4c1.654 0 3-1.346 3-3V7c0-1.654-1.346-3-3-3H7C5.346 4 4 5.346 4 7v4H2V7c0-2.757 2.243-5 5-5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
