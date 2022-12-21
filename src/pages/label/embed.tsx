import GoogleFontLoader from 'react-google-font-loader';
import LabelElement from '~/components/labels/label-element.tsx/label-element';
import { useLabel } from '~/hooks/label/use-label';
import { useLabelData } from '~/hooks/label/use-label-data';

const LabelEmbed = () => {
  const { id } = useParams();
  const { data, isLoading } = useLabel(id!);
  const { data: labelData } = useLabelData(data?.user.secret);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
  }, []);

  if (isLoading || !data || !labelData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: data.theme.label.text.fontFamily,
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
          },
          {
            font: data.theme.value.text.fontFamily,
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
          },
          {
            font: data.theme.value.accent.fontFamily,
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
          },
        ]}
      />
      <LabelElement theme={data.theme} data={labelData} />
    </>
  );
};

export default LabelEmbed;
