import { FieldValues, useForm } from 'react-hook-form';
import LabelElement from '~/components/labels/label-element.tsx/label-element';
import LabelSettings from '~/components/labels/label-settings/label-settings';
import { useCreateLabel } from '~/hooks/label/use-create-label';
import { useLabelData } from '~/hooks/label/use-label-data';
import { Label } from '~/types/schemas/label';
import { defaultLabel } from '~/utils/label/default-label';

const LabelCreate = () => {
  const [theme, setTheme] = useState<Label>(defaultLabel);

  const { handleSubmit, watch, control } = useForm({
    defaultValues: defaultLabel as FieldValues,
  });

  const { mutate: saveTheme } = useCreateLabel();
  const onCreate = handleSubmit((theme: FieldValues) => {
    saveTheme(theme as Label);
  });

  useEffect(() => {
    const subscription = watch((value) => setTheme(value as Label));
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (theme) {
      (async () => {
        const WebFont = await import('webfontloader');
        WebFont.load({
          google: {
            families: [
              theme.label.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
              theme.value.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
              theme.value.accent.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
            ],
          },
        });
      })();
    }
  }, [theme.label.text.fontFamily, theme.value.text.fontFamily, theme.value.accent.fontFamily]);

  const { data: labelData } = useLabelData();

  if (!labelData) return <p>Loading...</p>;

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[450px] shrink-0">
        <LabelSettings onSubmit={onCreate} control={control} />
      </div>
      <div className="flex flex-1 gap-10">
        <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-dark-600 p-10">
          <LabelElement theme={theme} data={labelData} />
        </div>
      </div>
    </div>
  );
};

export default LabelCreate;
