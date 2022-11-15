interface EventProps {
  className?: string;
}

const eventTemplate = (type: string) => {
  switch (type) {
    case '10':
      return (
        <p>
          <span></span> as followed you
        </p>
      );
  }
};

export const Event = (props: EventProps) => {
  return (
    <div className="flex h-10 w-full items-center border-b border-dark-300 bg-dark-400">
      <span className="inline-flex h-full items-center border-r border-dark-300 px-3 text-xxs font-bold uppercase text-white">
        Follow
      </span>
      <p className="px-3 text-sm">Salut comment vas ?</p>
    </div>
  );
};
