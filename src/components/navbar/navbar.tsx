import { useState } from 'react';
import { useAuthUser } from '../../hooks/auth/useAuthUser';
import { useLogout } from '../../hooks/auth/useLogout';
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
    <div className="h-screen w-20 bg-dark-500 border-r border-dark-300 fixed top-0 left-0 flex flex-col justify-between items-center">
      <div>
        <div className="w-20 h-20 bg-primary-500 mb-3 flex justify-center items-center">
          <img src={Logo} alt="Logo Streali" />
        </div>
        <div className="flex flex-col gap-1">
          {navigation.map((item, index) => (
            <div key={index}>
              <ButtonNav icon={item.icon} items={item.items} />
            </div>
          ))}
        </div>
      </div>
      <div>
        {user && (
          <Popover
            open={userNavOpen}
            onOpenChange={setUserNavOpen}
            trigger={<Avatar className="cursor-pointer" size={50} src={user.avatar_url} />}
            side="right"
            align="end">
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
      align="start"
      trigger={
        <div className="py-3w-10 h-10 cursor-pointer bg-dark-500 rounded-md text-white flex justify-center items-center hover:bg-primary-100 hover:text-primary-500 transition-colors duration-200 relative">
          <Icon name={icon} />
        </div>
      }>
      <div className="flex flex-col gap-2">
        <PopoverNavigation links={items} onLinkClick={() => setNavOpen(true)} />
      </div>
    </Popover>
  );
};
