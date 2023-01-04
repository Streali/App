import { useMemo } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { Button, ButtonColor } from '~/components/button/button';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { useAddress } from '~/hooks/address/use-address';
import { useSaveAddress } from '~/hooks/address/use-save-address';
import { useCountries } from '~/hooks/core/use-countries';

export function AddressForm() {
  const { control, reset, handleSubmit } = useForm();
  const { data: address } = useAddress();
  const { data: countries } = useCountries();
  const { mutate: saveAddress } = useSaveAddress();

  const listCountry = useMemo(
    () =>
      countries
        ?.map((country) => ({
          label: country.name,
          value: country.iso_code,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)) ?? [],
    [countries]
  );

  useEffect(() => {
    if (address) {
      reset(address);
    }
  }, [address, reset]);

  const onAddressSave = handleSubmit((addressField: FieldValues) => {
    // @ts-expect-error Current form library doesn't support types
    saveAddress({ ...addressField, ...(address ? { id: address.id } : {}) });
  });

  return (
    <form onSubmit={onAddressSave}>
      <div className="space-y-5">
        <div className="flex gap-10">
          <Controller
            name="organization"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="Organization"
                optional={true}
                containerClassName="flex-1"
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="Name"
                containerClassName="flex-1"
              />
            )}
          />
        </div>

        <div className="flex gap-10">
          <Controller
            name="address"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="Address"
                containerClassName="flex-1"
              />
            )}
          />

          <Controller
            name="address_complement"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="Complement"
                optional={true}
                containerClassName="flex-1"
              />
            )}
          />
        </div>

        <div className="flex gap-10">
          <Controller
            name="postal_code"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                defaultValue={value}
                label="Postal code"
                containerClassName="flex-1"
              />
            )}
          />

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
            name="country"
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Select
                options={listCountry}
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

        <div className="flex w-full justify-end">
          <Button type="submit" color={ButtonColor.Accent}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
