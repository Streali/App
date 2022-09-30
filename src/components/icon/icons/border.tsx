import { IconSVGProps } from '../icon';

export const IconBorder = (props: IconSVGProps) => {
  const { width = 24, height = 24, className = '', fill = '#fff', ...SVGProps } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
      {...SVGProps}
    >
      <path
        fill={fill}
        d="M10.833 5.833H9.167V7.5h1.666V5.833zm0 3.334H9.167v1.666h1.666V9.167zm3.334 0H12.5v1.666h1.667V9.167zM2.5 2.5v15h15v-15h-15zm13.333 13.333H4.167V4.167h11.666v11.666zm-5-3.333H9.167v1.667h1.666V12.5zM7.5 9.167H5.833v1.666H7.5V9.167z"
      ></path>
    </svg>
  );
};
