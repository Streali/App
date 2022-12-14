import { Link } from 'react-router-dom';
import Logo from '~/assets/logo.svg';
import { Avatar } from '~/components/avatar/avatar';
import { Icon } from '~/components/icon/icon';
import { PopoverLink, PopoverNavigation } from '~/components/popover/navigation/popover-navigation';
import { Popover } from '~/components/popover/popover';
import { useAuthUser } from '~/hooks/auth/use-auth-user';
import { useLogout } from '~/hooks/auth/use-logout';

export type NavigationItem = {
  icon: string;
  link: string;
  name: string;
};

export type PopoverNavigationItem = {
  icon: string;
  items: PopoverLink[];
};

export type NavigationItems = Array<NavigationItem>;

export interface NavbarProps {
  navigation: NavigationItems;
}

export const Navbar = (props: NavbarProps) => {
  const { data: user } = useAuthUser();
  const { mutate: logout } = useLogout();
  const { navigation } = props;
  const [userNavOpen, setUserNavOpen] = useState(false);
  const location = useLocation();

  const userNavigation: PopoverLink[] = [
    {
      title: 'Sign out',
      icon: 'logout-box-line',
      link: '/login',
      color: 'error',
      onClick: () => logout(),
    },
  ];

  return (
    <div className="fixed top-0 left-0 flex h-screen w-[300px] flex-col items-end justify-between border-r border-dark-400 bg-dark-500 p-10">
      <div className="flex w-full flex-col items-end">
        <Link to="/" className="mb-10">
          <img src={Logo} alt="Logo Streali" />
        </Link>
        <div className="flex flex-col items-end gap-2">
          {navigation.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="group flex items-center gap-2 text-sm font-bold"
            >
              <Icon
                name={item.icon}
                className={`transition-colors duration-200 group-hover:text-primary-500 ${
                  location.pathname.includes(item.link) ? 'text-primary-500' : 'text-white'
                }`}
              />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-shrink-0">
        {user && (
          <Popover
            open={userNavOpen}
            onOpenChange={setUserNavOpen}
            trigger={<Avatar className="cursor-pointer" size={45} src={user.avatar_url} />}
            side="right"
            align="end"
          >
            <PopoverNavigation links={userNavigation} onLinkClick={() => setUserNavOpen(false)} />
          </Popover>
        )}
      </div>
    </div>
  );
};

export interface ButtonNavbarProps {
  icon: string;
  link: string;
}

export interface PopoverButtonNavbarProps {
  icon: string;
  items: PopoverLink[];
}

export const ButtonNavbar = (props: ButtonNavbarProps) => {
  const { icon, link } = props;

  return (
    <Link
      to={link}
      className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-dark-500 text-white transition-colors duration-200 hover:bg-primary-100 hover:text-primary-500"
    >
      <Icon name={icon} />
    </Link>
  );
};

export const PopoverButtonNavbar = (props: PopoverButtonNavbarProps) => {
  const { icon, items } = props;
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Popover
      open={navOpen}
      onOpenChange={setNavOpen}
      side="right"
      align="center"
      trigger={
        <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-dark-500 text-white transition-colors duration-200 hover:bg-primary-100 hover:text-primary-500">
          <Icon name={icon} />
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <PopoverNavigation links={items} onLinkClick={() => setNavOpen(false)} />
      </div>
    </Popover>
  );
};
