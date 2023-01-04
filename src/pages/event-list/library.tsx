import { FieldValues } from 'react-hook-form';
import { Button, ButtonColor } from '~/components/button/button';
import EventListCard from '~/components/event-list/event-list-card';
import { Import } from '~/components/import/import';
import ProBadge from '~/components/pro-badge/pro-badge';
import { useCurrentPlan } from '~/hooks/billing/use-current-plan';
import { useCreateEventList } from '~/hooks/event-list/use-create-event-list';
import { useUserEventList } from '~/hooks/event-list/use-user-event-list';
import { EventList, EventListResponse, EventListSchema } from '~/types/schemas/event-list';

export default function EventListLibrary() {
  const { data, isLoading } = useUserEventList();
  const { mutate: createEventList } = useCreateEventList();
  const { data: plan } = useCurrentPlan();

  const handleSubmit = (theme: FieldValues) => {
    createEventList(theme.import as EventList);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-title text-4xl font-semibold">Event lists library</h1>
        <div className="flex items-center gap-2">
          <Import
            trigger={
              <Button iconLeft="file-add-line" color={ButtonColor.Dark}>
                Import theme
              </Button>
            }
            title={'Import Event list Theme'}
            text={'Event list title'}
            schema={EventListSchema}
            onSave={handleSubmit}
          />
          {plan?.name === 'free' && data?.length === 0 && (
            <Button iconLeft="add-line" link="/event-lists/create">
              Create theme
            </Button>
          )}
          {plan?.name === 'pro' && (
            <Button iconLeft="add-line" link="/event-lists/create">
              Create theme
            </Button>
          )}
          {plan?.name === 'free' && data?.length >= 1 && (
            <ProBadge
              trigger={<Button iconLeft="add-line">Create theme</Button>}
              content="You have reached the maximum of 1 event list that can be created on the free version. To create unlimited event list, you will need to upgrade to Streali Pro."
            />
          )}
        </div>
      </div>
      {!isLoading && data && (
        <div className="grid grid-cols-3 gap-4">
          {data &&
            data.length > 0 &&
            data?.map((theme: EventListResponse) => (
              <div key={theme.id}>
                <EventListCard theme={theme.theme} id={theme.id} secret={theme.secret} />
              </div>
            ))}
        </div>
      )}
      {(!data || data.length === 0) && (
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-medium">No themes found</h2>
          {plan?.name === 'free' && data?.length === 0 && (
            <Button iconLeft="add-line" link="/event-lists/create">
              Create theme
            </Button>
          )}
          {plan?.name === 'pro' && (
            <Button iconLeft="add-line" link="/event-lists/create">
              Create theme
            </Button>
          )}
          {plan?.name === 'free' && data?.length >= 1 && (
            <ProBadge
              trigger={<Button iconLeft="add-line">Create theme</Button>}
              content="You have reached the maximum of 1 event list that can be created on the free version. To create unlimited event list, you will need to upgrade to Streali Pro."
            />
          )}
        </div>
      )}
    </div>
  );
}
