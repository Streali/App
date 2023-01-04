import clsx from 'clsx';
import { PaymentFlowModal } from '~/components/billing/payment-flow-modal';
import { Icon } from '~/components/icon/icon';

interface PlanProps {
  name: string;
  price: number;
  isCurrent: boolean;
  popular: boolean;
  perks: string[];
  onContinue: () => void;
}

export default function Plan(props: PlanProps) {
  const { name, price, isCurrent, popular, onContinue } = props;

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
          <p className="rounded bg-green-200 px-2 py-1 text-xs font-bold uppercase text-green-700">
            Current
          </p>
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

      {!isCurrent && <PaymentFlowModal onContinue={onContinue} />}
    </div>
  );
}
