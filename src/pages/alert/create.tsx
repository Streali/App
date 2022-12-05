import { SingleValue } from 'react-select';
import { Button, ButtonColor } from '~/components/button/button';
import { Input } from '~/components/forms/input/input';
import { Select } from '~/components/forms/select/select';
import { toastr, ToastType } from '~/components/toast/toast';
import { useCreateAlert } from '~/hooks/alert/use-create-alert';
import { alertTypes } from '~/utils/alert/alert-type';

export function AlertCreate() {
  const [alertType, setAlertType] = useState<
    { value: string; label: string } | SingleValue<{ value: string; label: string }>
  >(alertTypes[0]);
  const [alertTitle, setAlertTitle] = useState<string>('Alert title');

  const navigate = useNavigate();

  const { mutate: createAlert } = useCreateAlert();

  const handleAlertCreate = () => {
    if (alertTitle.length < 5) {
      toastr(ToastType.Error, 'Error', 'Alert title must be at least 5 characters long');
      return;
    }

    createAlert(
      { title: alertTitle, type: parseInt(alertType?.value as string) },
      {
        onSuccess: (result) => {
          navigate(`/alerts/${result.id}/edit`);
        },
      }
    );
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-[500px] flex-col gap-3">
        <h1 className="font-title text-4xl font-semibold">Create new alert</h1>
        <Input
          type="text"
          label="Title"
          defaultValue={alertTitle}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setAlertTitle(target.value);
          }}
        />
        {/* <Select
          label="Type"
          options={alertTypes}
          defaultValue={alertType as { value: string; label: string }}
          onChange={(value) => setAlertType(value)}
        /> */}
        <div className="mt-3 flex w-full justify-end">
          <Button onClick={handleAlertCreate} color={ButtonColor.Primary}>
            Create alert
          </Button>
        </div>
      </div>
    </div>
  );
}
