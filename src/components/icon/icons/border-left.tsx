import { IconSVGProps } from '../icon';

export const IconBorderLeft = (props: IconSVGProps) => {
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
        d="M9.167 17.5h1.666v-1.667H9.167V17.5zm0-3.333h1.666V12.5H9.167v1.667zm0-10h1.666V2.5H9.167v1.667zm0 3.333h1.666V5.833H9.167V7.5zm0 3.333h1.666V9.167H9.167v1.666zM5.833 17.5H7.5v-1.667H5.833V17.5zm0-13.333H7.5V2.5H5.833v1.667zm0 6.666H7.5V9.167H5.833v1.666zM2.5 17.5h1.667v-15H2.5v15zm13.333-10H17.5V5.833h-1.667V7.5zm-3.333 10h1.667v-1.667H12.5V17.5zm3.333-3.333H17.5V12.5h-1.667v1.667zm0-11.667v1.667H17.5V2.5h-1.667zm0 8.333H17.5V9.167h-1.667v1.666zm0 6.667H17.5v-1.667h-1.667V17.5zM12.5 10.833h1.667V9.167H12.5v1.666zm0-6.666h1.667V2.5H12.5v1.667z"
      ></path>
    </svg>
  );
};
