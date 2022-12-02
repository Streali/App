import { FieldValues } from 'react-hook-form';
import { Button, ButtonColor } from '~/components/button/button';
import EventListCard from '~/components/event-list/event-list-card';
import { Import } from '~/components/import/import';
import { useCreateEventList } from '~/hooks/event-list/use-create-event-list';
import { useUserEventList } from '~/hooks/event-list/use-user-event-list';
import { EventList, EventListResponse, EventListSchema } from '~/types/schemas/event-list';

const EventListLibrary = () => {
  const { data, isLoading } = useUserEventList();
  const navigate = useNavigate();
  const { mutate: createEventList } = useCreateEventList();

  const handleSubmit = (theme: FieldValues) => {
    createEventList(theme.import as EventList, {
      onSuccess: () => {
        navigate('/chats');
      },
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10">
      <div className="mb-5 flex justify-between">
        <h1 className="font-title text-4xl font-semibold">Event lists library</h1>
        <div className="flex items-center gap-2">
          <Import
            trigger={
              <Button iconLeft="file-add-line" color={ButtonColor.Dark}>
                Import theme
              </Button>
            }
            title={'Import Chat Theme'}
            text={'Chat Theme Title'}
            schema={EventListSchema}
            onSave={handleSubmit}
          />
          <Button iconLeft="add-line" link="/event-lists/create">
            Create theme
          </Button>
        </div>
      </div>
      {!isLoading && data && (
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {data &&
            data.length > 0 &&
            data?.map((theme: EventListResponse) => (
              <div key={theme.id}>
                <EventListCard theme={theme.theme} id={theme.id} />
              </div>
            ))}
        </div>
      )}
      {(!data || data.length === 0) && (
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-medium">No themes found</h2>
          <Button iconLeft="add-line" link="/event-lists/create">
            Create event list theme
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventListLibrary;
