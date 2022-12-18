import { Button } from '~/components/button/button';
import LabelCard from '~/components/labels/label-card.tsx/label-card';
import { useLabelData } from '~/hooks/label/use-label-data';
import { useUserLabels } from '~/hooks/label/use-user-label';
import { LabelResponse } from '~/types/schemas/label';

const LabelLibrary = () => {
  const { data, isLoading } = useUserLabels();
  const { data: labelData } = useLabelData();

  if (isLoading || !labelData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-title text-4xl font-semibold">Labels library</h1>
        <div className="flex items-center gap-2">
          <Button iconLeft="add-line" link="/labels/create">
            Create label
          </Button>
        </div>
      </div>
      {!isLoading && data && (
        <div className="grid grid-cols-3 gap-4">
          {data &&
            data.length > 0 &&
            data?.map((label: LabelResponse) => (
              <div key={label.id}>
                <LabelCard label={label} labelData={labelData} />
              </div>
            ))}
        </div>
      )}
      {(!data || data.length === 0) && (
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-medium">No labels found</h2>
          <Button iconLeft="add-line" link="/labels/create">
            Create Label
          </Button>
        </div>
      )}
    </div>
  );
};

export default LabelLibrary;
