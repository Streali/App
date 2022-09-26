import { Button } from '../button/button';
import toast from 'react-hot-toast';

export interface ToastProps {
  type?: ToastType;
  title: string;
  content?: React.ReactNode;
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
  content?: React.ReactNode;
  icon?: string;
}

export const ToastUI = (props: ToastUIProps) => {
  const { type, title, content, icon } = props;

  const displayIcon = () => {
    if (icon) {
      return (
        <div className="w-9 h-9 rounded-lg bg-dark-400 flex flex-shrink-0 items-center justify-center">
          <i className={`ri-${icon}`} role="img"></i>
        </div>
      );
    }

    if (type !== ToastType.Default) {
      return (
        <div
          className={`w-9 h-9 rounded flex flex-shrink-0 items-center justify-center ${
            type === ToastType.Success ? 'bg-success-500' : ''
          } ${type === ToastType.Error ? 'bg-error-500' : ''} ${
            type === ToastType.Warning ? 'bg-warning-500' : ''
          }`}>
          <i className={`ri-${iconToast[type]} text-white text-lg`} role="img"></i>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`p-3 bg-black flex gap-3 items-start w-[300px] rounded-lg`}>
      {displayIcon()}
      <div>
        <p className="leading-none mb-0.5 font-bold">{title}</p>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};

export const toastr = (type: ToastType, title: string, content?: React.ReactNode) => {
  toast(<ToastUI type={type} title={title} content={content} />, {
    duration: 4000,
    position: 'top-right',
    className: '!p-0 !bg-transparent !border-0 !rounded-0 !shadow-none !text-white',
  });
};
