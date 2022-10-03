import { Link } from 'react-router-dom';
import { Icon, IconProps } from '~/components/icon/icon';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export enum ButtonColor {
  Primary = 'primary',
  Dark = 'dark',
  Error = 'error',
  Accent = 'accent',
  Black = 'black',
}

export enum ButtonSize {
  Normal = 'normal',
  Big = 'big',
  Small = 'small',
  Very_Small = 'very_small',
  Micro = 'micro',
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  color?: ButtonColor;
  size?: ButtonSize;
  children?: ReactNode;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  buttonIcon?: string;
  buttonIconSVG?: IconProps;
  link?: string;
  external?: boolean;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (props: ButtonProps) => {
  const {
    color = ButtonColor.Primary,
    size = ButtonSize.Normal,
    children,
    disabled = false,
    iconLeft,
    iconRight,
    buttonIcon,
    buttonIconSVG,
    link,
    external,
    onClick,
    className = '',
    type = 'button',
    ...otherProps
  } = props;

  const colorChoose = {
    [ButtonColor.Primary]:
      'bg-primary-500 hover:bg-primary-400 focus-visible:bg-primary-300 outline-primary-300',
    [ButtonColor.Dark]:
      'bg-dark-400 hover:bg-dark-300 focus-visible:bg-dark-300 outline-primary-300',
    [ButtonColor.Error]:
      'bg-error-500 hover:bg-error-400 focus-visible:bg-error-300 outline-error-500',
    [ButtonColor.Accent]:
      'bg-accent-500 hover:bg-accent-400 focus-visible:bg-accent-300 outline-accent-500 !text-black',
    [ButtonColor.Black]:
      'bg-black hover:bg-dark-500 focus-visible:bg-accent-300 outline-accent-500 text-white',
  };

  const sizeChoose = {
    [ButtonSize.Normal]: 'h-12 rounded-lg px-4',
    [ButtonSize.Big]: 'h-14 rounded-lg px-4',
    [ButtonSize.Small]: 'h-10 rounded-lg px-3',
    [ButtonSize.Very_Small]: 'h-8 rounded-lg px-3 text-sm',
    [ButtonSize.Micro]: '!h-6 rounded px-2 text-xs !rounded-full gap-1',
  };

  const disabledClassName =
    '!bg-light-100 !text-dark-100 hover:bg-light-100 hover:text-dark-100 cursor-default focus-visible:bg-light-100 !outline-light-100';

  const defineClassName = `gap-2 focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-[3px] inline-flex items-center text-white font-bold transition-colors ${
    colorChoose[color]
  } ${sizeChoose[size]} ${disabled ? disabledClassName : ''} ${className}`;

  const buttonContent = (
    <>
      {iconLeft && <Icon data-testid="btn-iconleft" name={iconLeft} />}
      {buttonIconSVG && <Icon {...buttonIconSVG} />}
      {buttonIcon ? <Icon data-testid="btn-icon" name={buttonIcon} /> : children}
      {iconRight && <Icon data-testid="btn-iconright" name={iconRight} />}
    </>
  );

  if (link && external) {
    return (
      <a href={link} rel="noreferrer" className={defineClassName} data-testid="btn-externallink">
        {buttonContent}
      </a>
    );
  }

  if (link && !external) {
    return (
      <Link to={link} data-testid="btn-internallink" className={defineClassName}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={defineClassName} type={type} {...otherProps}>
      {buttonContent}
    </button>
  );
};
