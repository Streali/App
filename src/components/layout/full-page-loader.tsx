import Loader from '~/assets/loader.webm';

export default function FullPageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-dark-500">
      <video src={Loader} autoPlay loop className="w-[300px]"></video>
    </div>
  );
}
