import Logo from '../../assets/logo.svg';

export const MinWidthWindow = () => {
  return (
    <div className="fixed z-[9999] top-0 left-0 bg-dark-500 justify-center items-center w-screen h-screen flex-col gap-2 flex lg:hidden">
      <img src={Logo} alt="Logo Streali" />
      <p className="font-medium">Streali is not responsive yet. Please use a bigger screen 💜</p>
    </div>
  );
};
