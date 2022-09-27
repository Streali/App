import Logo from '../../assets/logo.svg';

export const MinWidthWindow = () => {
  return (
    <div className="fixed top-0 left-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center gap-2 bg-dark-500 lg:hidden">
      <img src={Logo} alt="Logo Streali" />
      <p className="font-medium">Streali is not responsive yet. Please use a bigger screen 💜</p>
    </div>
  );
};
