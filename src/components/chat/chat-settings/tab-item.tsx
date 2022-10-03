import type { ReactNode } from 'react';

export interface TabItemProps {
  title: string;
  children: ReactNode;
}

export const TabItem = (props: TabItemProps) => {
  const { title, children } = props;

  return (
    <>
      <h2 className="mb-2 font-medium">{title}</h2>
      {children}
    </>
  );
};
