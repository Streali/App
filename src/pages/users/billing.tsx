import { Controller, FieldValues, useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { Button, ButtonColor } from '~/components/button/button';
import CreditCard from '~/components/credit-card/credit-card';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { Icon } from '~/components/icon/icon';

const listCountry = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FR', label: 'France' },
];

export default function Billing() {
  const { control, handleSubmit } = useForm();

  const onAdressSave = handleSubmit((address: FieldValues) => {
    console.log(address);
  });

  return (
    <div className="p-10">
      <h1 className="mb-10 font-title text-4xl font-semibold">Billing</h1>
      <h2 className="mb-5 font-title text-2xl font-semibold">Available plans</h2>
      <div className="mb-10 flex gap-10">
        <div className="flex-1 rounded-lg bg-dark-600 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-bold">Free</h3>
            <p className="rounded bg-white px-2 py-1 text-sm font-bold text-dark-500">Current</p>
          </div>
          <h4 className="mb-5 text-3xl font-bold">
            $0<span className="text-xl font-normal">/month</span>
          </h4>
          <ul>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-primary-500" />
              <span className="ml-2">Access to all Streali modules</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-primary-500" />
              <span className="ml-2">1 Chat theme</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-primary-500" />
              <span className="ml-2">1 Event list</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-primary-500" />
              <span className="ml-2">2 Labels</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-primary-500" />
              <span className="ml-2">500mb file storage</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-primary-500" />
              <span className="ml-2">Editor mode only</span>
            </li>
          </ul>
        </div>

        <div className="flex-1 rounded-lg bg-primary-500 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-bold">Pro</h3>
          </div>
          <h4 className="mb-5 text-3xl font-bold">
            $9<span className="text-xl font-normal">/month</span>
          </h4>
          <ul className="mb-5">
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-white" />
              <span className="ml-2">Access to all Streali modules</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-white" />
              <span className="ml-2">Unlimited Chat theme</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-white" />
              <span className="ml-2">Unlimited Event list</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-white" />
              <span className="ml-2">Unlimited Labels</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-white" />
              <span className="ml-2">2Gb file storage</span>
            </li>
            <li className="flex items-center font-semibold">
              <Icon name="checkbox-circle-fill" className="text-xl text-white" />
              <span className="ml-2">Editor mode & Developer mode</span>
            </li>
          </ul>
          <Button color={ButtonColor.Dark} className="w-full justify-center">
            Switch to this plan
          </Button>
        </div>
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
      <form onSubmit={onAdressSave} className="rounded-lg bg-dark-600 p-10">
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
