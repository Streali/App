import { useState } from 'react';
import { useAuthUser } from '../../hooks/auth/use-auth-user';
import { useLogout } from '../../hooks/auth/use-logout';
import { Avatar } from '../avatar/avatar';
import { Icon } from '../icon/icon';
import { PopoverLink, PopoverNavigation } from '../popover/navigation/popover-navigation';
import { Popover } from '../popover/popover';
import Logo from '../../assets/logo.svg';

export interface NavbarProps {
  navigation: { icon: string; items: PopoverLink[] }[];
}

export const Navbar = (props: NavbarProps) => {
  const { data: user } = useAuthUser();
  const { mutate: logout } = useLogout();
  const { navigation } = props;
  const [userNavOpen, setUserNavOpen] = useState(false);

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
    <div className="fixed top-0 left-0 flex h-screen w-20 flex-col items-center justify-between border-r border-dark-300 bg-dark-500">
      <div>
        <div className="flex h-20 w-20 items-center justify-center bg-primary-500">
          <img src={Logo} alt="Logo Streali" />
        </div>
        <div className="flex flex-col gap-1 py-5 px-5">
          {navigation.map((item, index) => (
            <div key={index}>
              <ButtonNav icon={item.icon} items={item.items} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-shrink-0 p-4">
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
  items: PopoverLink[];
}

export const ButtonNav = (props: ButtonNavbarProps) => {
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
