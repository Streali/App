import EventListItem from '~/components/event-list/event-list-item/event-list-item';
import { EventListSettings } from '~/components/event-list/event-list-settings';
import { EventList } from '~/types/schemas/event-list';
import { defaultEventListTheme } from '~/utils/event-list/default-event-list-theme';

export const EventListCreate = () => {
  const [theme, setTheme] = useState<EventList>(defaultEventListTheme);

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[450px] shrink-0">
        <EventListSettings onThemeChange={setTheme} />
      </div>
      <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-dark-600 p-10">
        <EventListItem
          theme={theme}
          type="follow"
          name="Follow"
          message="Willtraore follow the channel! "
        />
      </div>
    </div>
  );
};
