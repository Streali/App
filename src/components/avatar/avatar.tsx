import { Link } from 'react-router-dom';

export interface AvatarProps {
  link?: string;
  size?: number;
  src?: string;
  tag?: string;
  className?: string;
}

export const Avatar = (props: AvatarProps) => {
  const { link, size = 40, src, tag, className } = props;

  const image = () => {
    if (src) {
      return (
        <img
          style={{ width: size + 'px', height: size + 'px' }}
          src={src}
          alt="avatar"
          className={`rounded-full ${className}`}
        />
      );
    } else if (tag) {
      return (
        <span
          style={{ width: size + 'px', height: size + 'px' }}
          className={`flex items-center justify-center rounded-full bg-dark-300 text-xs leading-none ${className}`}
        >
          {tag}
        </span>
      );
    } else {
      return null;
    }
  };

  if (link) {
    return (
      <Link to={link} className={className}>
        <a>{image()}</a>
      </Link>
    );
  } else {
    return image();
  }
};
