import { IconSVGProps } from '../icon';

export const IconBorderRight = (props: IconSVGProps) => {
  const { width = 24, height = 24, className = '', fill = '#fff', ...SVGProps } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
      className={className}
      {...SVGProps}
    >
      <path
        fill={fill}
        d="M5.833 17.5H7.5v-1.667H5.833V17.5zM2.5 4.167h1.667V2.5H2.5v1.667zm3.333 0H7.5V2.5H5.833v1.667zm0 6.666H7.5V9.167H5.833v1.666zM2.5 17.5h1.667v-1.667H2.5V17.5zm6.667 0h1.666v-1.667H9.167V17.5zM2.5 10.833h1.667V9.167H2.5v1.666zm0 3.334h1.667V12.5H2.5v1.667zm0-6.667h1.667V5.833H2.5V7.5zm6.667 6.667h1.666V12.5H9.167v1.667zm3.333-3.334h1.667V9.167H12.5v1.666zM15.833 2.5v15H17.5v-15h-1.667zm-3.333 15h1.667v-1.667H12.5V17.5zm0-13.333h1.667V2.5H12.5v1.667zm-3.333 6.666h1.666V9.167H9.167v1.666zm0-6.666h1.666V2.5H9.167v1.667zm0 3.333h1.666V5.833H9.167V7.5z"
      ></path>
    </svg>
  );
};
