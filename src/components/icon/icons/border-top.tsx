import { IconSVGProps } from '../icon';

export const IconBorderTop = (props: IconSVGProps) => {
  const { width = 24, height = 24, className = '', fill = '#fff' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        fill={fill}
        d="M5.833 17.5H7.5v-1.667H5.833V17.5zm0-6.667H7.5V9.167H5.833v1.666zm3.334 0h1.666V9.167H9.167v1.666zm0 6.667h1.666v-1.667H9.167V17.5zM2.5 14.167h1.667V12.5H2.5v1.667zm0 3.333h1.667v-1.667H2.5V17.5zm0-6.667h1.667V9.167H2.5v1.666zm0-3.333h1.667V5.833H2.5V7.5zm6.667 6.667h1.666V12.5H9.167v1.667zM15.833 7.5H17.5V5.833h-1.667V7.5zm0 3.333H17.5V9.167h-1.667v1.666zM2.5 2.5v1.667h15V2.5h-15zm13.333 11.667H17.5V12.5h-1.667v1.667zM12.5 17.5h1.667v-1.667H12.5V17.5zm-3.333-10h1.666V5.833H9.167V7.5zm6.666 10H17.5v-1.667h-1.667V17.5zM12.5 10.833h1.667V9.167H12.5v1.666z"
      ></path>
    </svg>
  );
};
