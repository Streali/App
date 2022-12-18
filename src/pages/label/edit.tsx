import { FieldValues, useForm } from 'react-hook-form';
import LabelElement from '~/components/labels/label-element.tsx/label-element';
import LabelSettings from '~/components/labels/label-settings/label-settings';
import { useCreateLabel } from '~/hooks/label/use-create-label';
import { useLabel } from '~/hooks/label/use-label';
import { useLabelData } from '~/hooks/label/use-label-data';
import { useUpdateLabel } from '~/hooks/label/use-update-label';
import { Label, LabelResponse } from '~/types/schemas/label';

const LabelEdit = () => {
  const [theme, setTheme] = useState<Label | null>(null);
  const { id } = useParams();
  const { data: label } = useLabel(id!);

  const { handleSubmit, watch, control, reset } = useForm({
    defaultValues: { ...label?.theme, title: label?.title } as FieldValues,
  });

  const { mutate: saveTheme } = useUpdateLabel();
  const onSubmit = handleSubmit((theme: FieldValues) => {
    saveTheme({ id: label?.id, theme: theme } as Omit<LabelResponse, 'created_at' | 'updated_at'>);
  });

  useEffect(() => {
    if (!label) return;

    setTheme(label.theme);
    reset(label.theme);
  }, [label]);

  useEffect(() => {
    const subscription = watch((value) => setTheme(value as Label));
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (label?.theme) {
      (async () => {
        const WebFont = await import('webfontloader');
        WebFont.load({
          google: {
            families: [
              label?.theme.label.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
              label?.theme.value.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
              label?.theme.value.accent.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
            ],
          },
        });
      })();
    }
  }, [
    label?.theme.label.text.fontFamily,
    label?.theme.value.text.fontFamily,
    label?.theme.value.accent.fontFamily,
  ]);

  const { data: labelData } = useLabelData();

  if (status === 'error' || !theme) {
    return <p>Loading...</p>;
  }

  if (!labelData) return <p>Loading...</p>;

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[450px] shrink-0">
        <LabelSettings onSubmit={onSubmit} control={control} />
      </div>
      <div className="flex flex-1 gap-10">
        <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-dark-600 p-10">
          <LabelElement theme={theme} data={labelData} />
        </div>
      </div>
    </div>
  );
};

export default LabelEdit;
