import { Link } from 'react-router-dom';
import { Icon } from '../icon/icon';

export enum ButtonColor {
  Primary = 'primary',
  Dark = 'dark',
  Error = 'error',
  Accent = 'accent',
}

export enum ButtonSize {
  Normal = 'normal',
  Big = 'big',
  Small = 'small',
  Very_Small = 'very_small',
  Micro = 'micro',
}

export interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  children?: React.ReactNode;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  buttonIcon?: string;
  link?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
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
    link,
    external,
    onClick,
    className = '',
    type = 'button',
  } = props;

  const colorChoose = {
    [ButtonColor.Primary]:
      'bg-primary-500 hover:bg-primary-400 focus-visible:bg-primary-300 outline-primary-300',
    [ButtonColor.Dark]:
      'bg-dark-500 border-2 border-dark-300 hover:bg-dark-400 focus-visible:bg-dark-300 outline-primary-300',
    [ButtonColor.Error]:
      'bg-error-500 hover:bg-error-400 focus-visible:bg-error-300 outline-error-500',
    [ButtonColor.Accent]:
      'bg-accent-500 hover:bg-accent-400 focus-visible:bg-accent-300 outline-accent-500 text-black',
  };

  const sizeChoose = {
    [ButtonSize.Normal]: 'h-12 rounded-md px-4',
    [ButtonSize.Big]: 'h-14 rounded-md px-4',
    [ButtonSize.Small]: 'h-10 rounded px-3',
    [ButtonSize.Very_Small]: 'h-8 rounded px-3 text-sm',
    [ButtonSize.Micro]: 'h-6 rounded px-2 text-xs rounded-full gap-1',
  };

  const disabledClassName =
    '!bg-light-100 !text-dark-100 hover:bg-light-100 hover:text-dark-100 cursor-default focus-visible:bg-light-100 !outline-light-100';

  const defineClassName = `gap-2 focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-[3px] inline-flex items-center text-white font-bold transition-colors ${
    colorChoose[color]
  } ${sizeChoose[size]} ${disabled ? disabledClassName : ''} ${className}`;

  const buttonContent = (
    <>
      {iconLeft && <Icon data-testid="btn-iconleft" name={iconLeft} />}
      {buttonIcon ? <Icon data-testid="btn-icon" name={buttonIcon} /> : children}
      {iconRight && <Icon data-testid="btn-iconright" name={iconRight} />}
    </>
  );

  if (link && external) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={defineClassName}
        data-testid="btn-externallink"
      >
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
    <button onClick={onClick} className={defineClassName} type={type}>
      {buttonContent}
    </button>
  );
};
