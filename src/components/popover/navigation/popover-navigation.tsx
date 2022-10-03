import { Link } from 'react-router-dom';
import { Confirmation } from '~/components/confirmation/confirmation';
import { Icon } from '~/components/icon/icon';
import type { MouseEvent } from 'react';

export interface PopoverLink {
  icon?: string;
  title: string;
  link?: string;
  color?: 'primary' | 'dark' | 'error';
  className?: string;
  onClick?: (e: MouseEvent) => void;
  confirm?: {
    title: string;
    text: string;
    word: string;
    confirmText: string;
    textButton?: string;
    onConfirm?: () => void;
  };
}

export interface PopoverNavigationProps {
  links: PopoverLink[];
  onLinkClick?: () => void;
}

export const PopoverNavigation = (props: PopoverNavigationProps) => {
  const { links, onLinkClick } = props;

  const colorClassName = {
    primary: 'hover:bg-primary-500',
    dark: 'hover:bg-dark-500',
    error: 'hover:bg-error-500',
  };

  return (
    <div className="flex flex-col gap-1">
      {links.map((link, index) => (
        <div key={index}>
          {!link.onClick && link.link && (
            <Link
              to={link.link}
              onClick={onLinkClick}
              className={`inline-flex h-7 w-full cursor-pointer items-center gap-2 rounded px-2 transition-colors ${
                colorClassName[link.color || 'primary']
              } ${link.className}`}
            >
              {link.icon && <Icon name={link.icon} className="mr-1" />}
              {link.title}
            </Link>
          )}
          {link.onClick && (
            <div
              className={`inline-flex h-7 w-full cursor-pointer items-center gap-2 rounded px-2 transition-colors ${
                colorClassName[link.color || 'primary']
              } ${link.className}`}
              onClick={(e) => {
                link.onClick && link.onClick(e);
                onLinkClick && onLinkClick();
              }}
            >
              {link.icon && <Icon name={link.icon} className="mr-1" />}
              {link.title}
            </div>
          )}
          {link.confirm && (
            <Confirmation
              title={link.confirm.title}
              text={link.confirm.text}
              word={link.confirm.word}
              confirmText={link.confirm.confirmText}
              textButton={link.confirm.textButton}
              onConfirmationClose={onLinkClick}
              onConfirm={() => {
                link.confirm && link.confirm.onConfirm && link.confirm.onConfirm();
                onLinkClick && onLinkClick();
              }}
              trigger={
                <div
                  className={`inline-flex h-7 w-full cursor-pointer items-center gap-2 rounded px-2 transition-colors ${
                    colorClassName[link.color || 'primary']
                  } ${link.className}`}
                  onClick={(e) => {
                    link.onClick && link.onClick(e);
                  }}
                >
                  {link.icon && <Icon name={link.icon} className="mr-1" />}
                  {link.title}
                </div>
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};
