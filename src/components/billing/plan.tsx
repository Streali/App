import clsx from 'clsx';
import { Button, ButtonColor } from '~/components/button/button';
import { Icon } from '~/components/icon/icon';

interface PlanProps {
  name: string;
  price: number;
  isCurrent: boolean;
  popular: boolean;
  perks: string[];
}

export default function Plan(props: PlanProps) {
  const { name, price, isCurrent, popular } = props;

  const containerClasses = clsx('flex-1 rounded-lg p-5', {
    'bg-primary-500': popular,
    'bg-dark-600': !popular,
  });

  const iconClasses = clsx('text-xl', {
    'text-white': popular,
    'text-primary-500': !popular,
  });

  return (
    <div className={containerClasses}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-bold">{name}</h3>

        {isCurrent && (
          <p className="rounded bg-white px-2 py-1 text-sm font-bold text-dark-500">Current</p>
        )}
      </div>

      <h4 className="mb-5 text-3xl font-bold">
        ${price}
        <span className="text-xl font-normal">/month</span>
      </h4>

      <ul>
        {props.perks.map((perk) => (
          <li className="flex items-center font-semibold" key={perk}>
            <Icon name="checkbox-circle-fill" className={iconClasses} />
            <span className="ml-2">{perk}</span>
          </li>
        ))}
      </ul>

      {!isCurrent && (
        <Button color={ButtonColor.Dark} className="mt-5 w-full justify-center">
          Switch to this plan
        </Button>
      )}
    </div>
  );
}
