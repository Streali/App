import Mastercard from '~/assets/mastercard.png';
import Visa from '~/assets/visa.svg';
import { Button, ButtonColor, ButtonSize } from '../button/button';

interface CreditCardProps {
  className?: string;
  cardEnd: string;
  type: 'mastercard' | 'visa';
  expiring: string;
  onDelete: () => void;
  onSetDefault: () => void;
  isDefault: boolean;
}

export default function CreditCard(props: CreditCardProps) {
  const { className, cardEnd, type, expiring, onDelete, onSetDefault, isDefault } = props;

  return (
    <div
      className={`relative flex h-60 flex-col items-start justify-center rounded-lg bg-dark-600 p-5 ${
        isDefault ? 'border-2 border-primary-500' : 'border border-dark-400'
      } ${className}`}
    >
      <p className="mb-5 font-normal">
        Credit card ending in <span className="font-bold">{cardEnd}</span>
      </p>
      {type === 'visa' ? (
        <img src={Visa} alt="Visa" className="mb-3 block h-8 w-auto" />
      ) : (
        <img src={Mastercard} alt="Mastercard" className="mb-3 block h-8 w-auto" />
      )}
      <p className="mb-3 text-sm text-dark-100">Expiring in {expiring}</p>
      <div className="flex gap-2">
        <Button
          color={ButtonColor.Primary}
          size={ButtonSize.Very_Small}
          onClick={onSetDefault}
          disabled={isDefault}
        >
          Set as default
        </Button>
      </div>

      <Button
        color={ButtonColor.Dark}
        size={ButtonSize.Very_Small}
        onClick={onDelete}
        buttonIcon="delete-bin-line"
        className="absolute top-2 right-2"
      >
        Delete
      </Button>
    </div>
  );
}
