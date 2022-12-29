import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import { OnlineIndicator } from '~/components/layout/online-indicator';
import { MinWidthWindow } from '~/components/min-width-window/min-width-window';
import { Navbar } from '~/components/navbar/navbar';
import { navigation, pagesWithoutLayout } from '~/core/navigation';
import type { ReactNode } from 'react';

export default function Shell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isWithLayout = !pagesWithoutLayout.some((path) => location.pathname.includes(path));

  const classes = clsx([
    'relative min-h-screen',
    {
      'ml-[200px] w-[calc(100%_-_200px)]': isWithLayout,
      'ml-0 w-screen': !isWithLayout,
    },
  ]);

  return (
    <>
      {isWithLayout && (
        <>
          <MinWidthWindow />
          <Navbar navigation={navigation} />
        </>
      )}

      <main className={classes}>
        <OnlineIndicator />

        {children}
      </main>

      <Toaster position="top-right" />
    </>
  );
}
