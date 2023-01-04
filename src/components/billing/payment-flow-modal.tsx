import { AddressForm } from '~/components/billing/address-form';
import { Button, ButtonColor } from '~/components/button/button';
import { Modal } from '~/components/modal/modal';
import { useAddress } from '~/hooks/address/use-address';
import { usePaymentMethods } from '~/hooks/billing/use-payment-methods';

interface PaymentFlowModalProps {
  onContinue: () => void;
}

export function PaymentFlowModal(props: PaymentFlowModalProps) {
  const { onContinue } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { data: address } = useAddress();
  const { data: paymentMethods } = usePaymentMethods();

  useEffect(() => {
    if (isOpen && address && paymentMethods && paymentMethods.length > 0) {
      onContinue();
    }
  }, [isOpen, address, paymentMethods]);

  let children: JSX.Element;

  if (!address) {
    children = <AddressForm />;
  } else if (!paymentMethods || paymentMethods.length === 0) {
    children = (
      <Button link={`${import.meta.env.VITE_API_URL}/billings/payment-methods/add`} external>
        Add a card
      </Button>
    );
  } else {
    children = <div>Loading</div>;
  }

  return (
    <Modal
      containerClassName="!max-w-3xl !w-full !bg-dark-600 !p-10"
      trigger={
        <Button color={ButtonColor.Dark} className="mt-5 w-full justify-center">
          Switch to this plan
        </Button>
      }
      title={'Payment'}
      open={isOpen}
      onOpenChange={(state) => setIsOpen(state)}
    >
      {children}
    </Modal>
  );
}
