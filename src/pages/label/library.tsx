import { Button } from '~/components/button/button';
import LabelCard from '~/components/labels/label-card/label-card';
import ProBadge from '~/components/pro-badge/pro-badge';
import { useCurrentPlan } from '~/hooks/billing/use-current-plan';
import { useLabelData } from '~/hooks/label/use-label-data';
import { useUserLabels } from '~/hooks/label/use-user-label';
import { LabelResponse } from '~/types/schemas/label';

export default function LabelLibrary() {
  const { data, isLoading } = useUserLabels();
  const { data: labelData } = useLabelData();
  const { data: plan } = useCurrentPlan();

  if (isLoading || !labelData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-title text-4xl font-semibold">Labels library</h1>
        <div className="flex items-center gap-2">
          {plan?.name === 'free' && data?.length === 0 && (
            <Button iconLeft="add-line" link="/labels/create">
              Create label
            </Button>
          )}
          {plan?.name === 'pro' && (
            <Button iconLeft="add-line" link="/labels/create">
              Create label
            </Button>
          )}
          {plan?.name === 'free' && data?.length >= 2 && (
            <ProBadge
              trigger={<Button iconLeft="add-line">Create label</Button>}
              content="You have reached the maximum of 2 labels that can be created on the free version. To create unlimited labels, you will need to upgrade to Streali Pro."
            />
          )}
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
          {plan?.name === 'free' && data?.length === 0 && (
            <Button iconLeft="add-line" link="/labels/create">
              Create label
            </Button>
          )}
          {plan?.name === 'pro' && (
            <Button iconLeft="add-line" link="/labels/create">
              Create label
            </Button>
          )}
          {plan?.name === 'free' && data?.length >= 2 && (
            <ProBadge
              trigger={<Button iconLeft="add-line">Create label</Button>}
              content="You have reached the maximum of 2 labels that can be created on the free version. To create unlimited labels, you will need to upgrade to Streali Pro."
            />
          )}
        </div>
      )}
    </div>
  );
}
