import React from 'react';
import LabelElement from '~/components/labels/label-element.tsx/label-element';
import { useLabel } from '~/hooks/label/use-label';
import { useLabelData } from '~/hooks/label/use-label-data';

const LabelEmbed = () => {
  const { id } = useParams();
  const { data, isLoading } = useLabel(id!);
  const { data: labelData, refetch } = useLabelData();

  useEffect(() => {
    if (data) {
      (async () => {
        const WebFont = await import('webfontloader');
        WebFont.load({
          google: {
            families: [
              data.theme.label.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
              data.theme.value.text.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
              data.theme.value.accent.fontFamily + ':100,200,300,400,500,600,700,800,900,950',
            ],
          },
        });
      })();
    }
  }, [
    data?.theme.label.text.fontFamily,
    data?.theme.value.text.fontFamily,
    data?.theme.value.accent.fontFamily,
  ]);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !data || !labelData) {
    return <p>Loading...</p>;
  }

  return <LabelElement theme={data.theme} data={labelData} />;
};

export default LabelEmbed;
