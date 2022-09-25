import { useForm } from 'react-hook-form';
import { AlertSettings } from '../../components/alert/alert-settings/alert-settings';

export const AlertCreate = () => {
  const { handleSubmit, watch, getValues, control } = useForm();

  return (
    <div className="p-10 flex gap-10">
      <div className="w-[350px] shrink-0">
        <AlertSettings
          title="New alert"
          control={control}
          addElement={(type) => console.log(type)}
        />
      </div>
    </div>
  );
};
