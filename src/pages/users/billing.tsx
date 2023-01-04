import { AddressForm } from '~/components/billing/address-form';
import CreditCard from '~/components/billing/credit-card';
import Plan from '~/components/billing/plan';
import { Button } from '~/components/button/button';
import { useCancelPlan } from '~/hooks/billing/use-cancel-plan';
import { useCurrentPlan } from '~/hooks/billing/use-current-plan';
import { usePaymentMethods } from '~/hooks/billing/use-payment-methods';
import { useUpgradePlan } from '~/hooks/billing/use-upgrade-plan';

export default function Billing() {
  const { data: plan } = useCurrentPlan();
  const { data: paymentMethods } = usePaymentMethods();
  const { mutate: upgradePlan } = useUpgradePlan();
  const { mutate: cancelPlan } = useCancelPlan();

  return (
    <div className="p-10">
      <h1 className="mb-10 font-title text-4xl font-semibold">Billing</h1>
      <h2 className="mb-5 font-title text-2xl font-semibold">Available plans</h2>
      <div className="mb-10 flex gap-10">
        <Plan
          name={'Free'}
          price={0}
          isCurrent={plan?.name === 'free'}
          popular={false}
          perks={[
            'Access to all Streali modules',
            '1 Chat theme',
            '1 Event list',
            '2 labels',
            '500mb file storage',
            'Editor mode',
          ]}
          onContinue={() => cancelPlan()}
        />

        <Plan
          name={'Pro'}
          price={9}
          isCurrent={plan?.name === 'pro'}
          popular={true}
          perks={[
            'Access to all Streali modules',
            'Unlimited Chat theme',
            'Unlimited Event list',
            'Unlimited labels',
            '10Gb file storage',
            'Editor mode & Developer mode',
          ]}
          onContinue={() => upgradePlan()}
        />
      </div>

      <h2 className="mb-5 font-title text-2xl font-semibold">Payment method</h2>
      <div className="mb-10 grid grid-cols-3 gap-10">
        {paymentMethods?.map((paymentMethod) => (
          <CreditCard
            key={paymentMethod.id}
            type={paymentMethod.brand as 'visa' | 'mastercard'}
            expiring={`${paymentMethod.expiry_month}/${paymentMethod.expiry_year}`}
            cardEnd={paymentMethod.last_four}
            onDelete={() => console.log('delete')}
            onSetDefault={() => console.log('set default')}
            isDefault
          />
        ))}

        <div className="flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dotted border-dark-300 bg-dark-400 p-5">
          <p className="mb-5 font-bold">Add a new payment method</p>
          <Button link={`${import.meta.env.VITE_API_URL}/billings/payment-methods/add`} external>
            Add a card
          </Button>
        </div>
      </div>

      <h2 className="mb-5 font-title text-2xl font-semibold">Billing address</h2>
      <div className="rounded-lg bg-dark-600 p-10">
        <AddressForm />
      </div>
    </div>
  );
}
