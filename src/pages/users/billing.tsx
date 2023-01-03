import { Controller, FieldValues, useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';
import CreditCard from '~/components/billing/credit-card';
import Plan from '~/components/billing/plan';
import { Button, ButtonColor } from '~/components/button/button';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';

const listCountry = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FR', label: 'France' },
];

export default function Billing() {
  const { control, handleSubmit } = useForm();

  const onAddressSave = handleSubmit((address: FieldValues) => {
    console.log(address);
  });

  return (
    <div className="p-10">
      <h1 className="mb-10 font-title text-4xl font-semibold">Billing</h1>
      <h2 className="mb-5 font-title text-2xl font-semibold">Available plans</h2>
      <div className="mb-10 flex gap-10">
        <Plan
          name={'Free'}
          price={0}
          isCurrent={true}
          popular={false}
          perks={[
            'Access to all Streali modules',
            '1 Chat theme',
            '1 Event list',
            '2 labels',
            '500mb file storage',
            'Editor mode',
          ]}
        />

        <Plan
          name={'Pro'}
          price={9}
          isCurrent={false}
          popular={true}
          perks={[
            'Access to all Streali modules',
            'Unlimited Chat theme',
            'Unlimited Event list',
            'Unlimited labels',
            '10Gb file storage',
            'Editor mode & Developer mode',
          ]}
        />
      </div>

      <h2 className="mb-5 font-title text-2xl font-semibold">Payment method</h2>
      <div className="mb-10 grid grid-cols-3 gap-10">
        <CreditCard
          cardEnd="1234"
          type="mastercard"
          expiring="01/25"
          onDelete={() => console.log('delete')}
          onSetDefault={() => console.log('set default')}
          isDefault
        />
        <CreditCard
          cardEnd="1234"
          type="visa"
          expiring="01/25"
          onDelete={() => console.log('delete')}
          onSetDefault={() => console.log('set default')}
          isDefault={false}
        />
        <div className="flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dotted border-dark-300 bg-dark-400 p-5">
          <p className="mb-5 font-bold">Add a new payment method</p>
          <Button>Add a card</Button>
        </div>
      </div>

      <h2 className="mb-5 font-title text-2xl font-semibold">Billing address</h2>
      <form onSubmit={onAddressSave} className="rounded-lg bg-dark-600 p-10">
        <div className="mb-3 flex gap-10">
          <Controller
            name="firstname"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="Firstname"
                containerClassName="flex-1"
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="Lastname"
                containerClassName="flex-1"
              />
            )}
          />
        </div>
        <Controller
          name="address"
          control={control}
          defaultValue={''}
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              defaultValue={value}
              label="Address"
              containerClassName="flex-1 mb-3"
            />
          )}
        />
        <div className="mb-3 flex gap-10">
          <Controller
            name="city"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="City"
                containerClassName="flex-1"
              />
            )}
          />
          <Controller
            name="zipcode"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="Zipcode"
                containerClassName="flex-1"
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            defaultValue={'FR'}
            render={({ field: { onChange, value } }) => (
              <Select
                options={[]}
                label="Country"
                containerClassName="flex-1"
                defaultValue={listCountry.find((item) => item.value === value)}
                onChange={(value) => {
                  const v = value as SingleValue<{ label: string; value: string }>;
                  onChange(v?.value);
                }}
              />
            )}
          />
        </div>
        <div className="mt-5 flex w-full justify-end">
          <Button type="submit" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
