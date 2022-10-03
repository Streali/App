import toast from 'react-hot-toast';
import { Button } from '~/components/button/button';
import type { ReactNode } from 'react';

export interface ToastProps {
  type?: ToastType;
  title: string;
  content?: ReactNode;
}

export enum ToastType {
  Default = 'default',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export const iconToast = {
  [ToastType.Success]: 'check-line',
  [ToastType.Error]: 'close-circle-line',
  [ToastType.Warning]: 'error-warning-line',
  [ToastType.Default]: '',
};

export const Toast = (props: ToastProps) => {
  const { type = ToastType.Default, title, content } = props;

  const display = () => toastr(type, title, content);

  return <Button onClick={display}>Display toast</Button>;
};

export interface ToastUIProps {
  type: ToastType;
  title?: string;
  content?: ReactNode;
  icon?: string;
}

export const ToastUI = (props: ToastUIProps) => {
  const { type, title, content, icon } = props;

  const displayIcon = () => {
    if (icon) {
      return (
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-dark-400">
          <i className={`ri-${icon}`} role="img"></i>
        </div>
      );
    }

    if (type !== ToastType.Default) {
      return (
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded ${
            type === ToastType.Success ? 'bg-success-500' : ''
          } ${type === ToastType.Error ? 'bg-error-500' : ''} ${
            type === ToastType.Warning ? 'bg-warning-500' : ''
          }`}
        >
          <i className={`ri-${iconToast[type]} text-lg text-white`} role="img"></i>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`flex w-[300px] items-start gap-3 rounded-lg bg-black p-3`}>
      {displayIcon()}
      <div>
        <p className="mb-0.5 font-bold leading-none">{title}</p>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

export const toastr = (type: ToastType, title: string, content?: ReactNode) => {
  toast(<ToastUI type={type} title={title} content={content} />, {
    duration: 4000,
    position: 'top-right',
    className: '!p-0 !bg-transparent !border-0 !rounded-0 !shadow-none !text-white',
  });
};
