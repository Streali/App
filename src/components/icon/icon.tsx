import { IconBorder } from './icons/border';

export enum IconSVG {
  Border = 'border',
}

export interface IconSVGProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

export interface IconProps {
  name?: string;
  className?: string;
  svg?: IconSVG;
  width?: number;
  height?: number;
  fill?: string;
}

export const Icon = (props: IconProps) => {
  const { name, className = '', svg, width, height, fill } = props;

  const svgIcon = {
    [IconSVG.Border]: (
      <IconBorder className={className} width={width} height={height} fill={fill} />
    ),
  };

  if (svg) {
    return svgIcon[svg];
  }

  return <i className={`ri-${name} ${className}`} role="img"></i>;
};
