import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { Checkbox } from '~/components/forms/checkbox/checkbox';
import { toastr, ToastType } from '~/components/toast/toast';
import { useAuthUser } from '~/hooks/auth/use-auth-user';

const listEvents = [
  {
    label: 'Follow',
    checked: true,
  },
  {
    label: 'Subscribe',
    checked: true,
  },
  {
    label: 'Subscription Gift',
    checked: true,
  },
  {
    label: 'Raid',
    checked: true,
  },
  {
    label: 'Hype Train Begin',
    checked: true,
  },
  {
    label: 'Hype Train Progress',
    checked: true,
  },
  {
    label: 'Hype Train End',
    checked: true,
  },
  {
    label: 'Goal Begin',
    checked: true,
  },
  {
    label: 'Goal End',
    checked: true,
  },
];

export const Dashboard = () => {
  const [eventChecked, setEventChecked] = useState<{ label: string; checked: boolean }[]>([]);
  const { data: user } = useAuthUser();

  const handleEventChecked = (label: string, value: boolean) => {
    const currentList = [...eventChecked].map((item) => {
      if (item.label === label) {
        return {
          ...item,
          checked: value,
        };
      }
      return item;
    });

    localStorage.setItem('eventsDashboard', JSON.stringify(currentList));
    setEventChecked(currentList);
  };

  const handleEventSelectAll = () => {
    localStorage.setItem('eventsDashboard', JSON.stringify(listEvents));
    setEventChecked(listEvents);
  };

  const handleEmbedClick = () => {
    navigator.clipboard.writeText(`${window.location.host}/events`);
    toastr(
      ToastType.Success,
      'Embed link copied!',
      'Now you can add a new panel with this link on your streaming software.'
    );
  };

  useEffect(() => {
    const eventsDashboard = localStorage.getItem('eventsDashboard');
    if (eventsDashboard) {
      setEventChecked(JSON.parse(eventsDashboard));
    } else {
      setEventChecked(listEvents);
    }
  }, []);

  return (
    <div className="grid grid-cols-2 gap-10 p-10">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-title text-4xl font-semibold">Event list</h1>
          <Button
            iconLeft="file-copy-line"
            color={ButtonColor.Accent}
            onClick={handleEmbedClick}
            size={ButtonSize.Small}
          >
            Add to OBS
          </Button>
        </div>
        <div className="mb-6 rounded-lg bg-dark-600 p-6">
          <Button className="mb-4" onClick={handleEventSelectAll} size={ButtonSize.Very_Small}>
            Select all
          </Button>
          <div className="flex flex-wrap gap-3">
            {eventChecked.map((event) => (
              <Checkbox
                key={event.label}
                label={event.label}
                checked={event.checked}
                onChange={(e) => {
                  handleEventChecked(event.label, e.target.checked);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh_-_80px)] flex-1 flex-col gap-10">
        <iframe
          src={`https://player.twitch.tv/?channel=${user?.username}&parent=${window.location.hostname}`}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          className="aspect-video w-full rounded-lg"
        ></iframe>
        <iframe
          className="w-full flex-1 rounded-lg"
          id="chat_embed"
          src={`https://www.twitch.tv/embed/${user?.username}/chat?parent=${window.location.hostname}&darkpopout`}
          height="500"
          width="350"
        ></iframe>
      </div>
    </div>
  );
};
