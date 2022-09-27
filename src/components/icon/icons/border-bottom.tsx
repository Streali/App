import { IconSVGProps } from '../icon';

export const IconBorderBottom = (props: IconSVGProps) => {
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
        d="M7.5 9.167H5.833v1.666H7.5V9.167zm3.333 3.333H9.167v1.667h1.666V12.5zM7.5 2.5H5.833v1.667H7.5V2.5zm3.333 6.667H9.167v1.666h1.666V9.167zM4.167 2.5H2.5v1.667h1.667V2.5zm6.666 3.333H9.167V7.5h1.666V5.833zm3.334 3.334H12.5v1.666h1.667V9.167zM10.833 2.5H9.167v1.667h1.666V2.5zm3.334 0H12.5v1.667h1.667V2.5zm1.666 8.333H17.5V9.167h-1.667v1.666zm0 3.334H17.5V12.5h-1.667v1.667zM4.167 5.833H2.5V7.5h1.667V5.833zM15.833 2.5v1.667H17.5V2.5h-1.667zm0 5H17.5V5.833h-1.667V7.5zM4.167 9.167H2.5v1.666h1.667V9.167zM2.5 17.5h15v-1.667h-15V17.5zm1.667-5H2.5v1.667h1.667V12.5z"
      ></path>
    </svg>
  );
};
