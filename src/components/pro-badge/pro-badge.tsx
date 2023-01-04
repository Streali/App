import { Button, ButtonColor } from '../button/button';
import { Popover } from '../popover/popover';

interface ProBadgeProps {
  content?: string;
  trigger?: React.ReactNode;
}

export default function ProBadge(props: ProBadgeProps) {
  const {
    content = 'Get access to this feature with a Streali Pro membership. Upgrade now to unlock all Streali features.',
    trigger,
  } = props;

  const [open, setOpen] = useState(false);

  const badge = (
    <div className="inline-flex cursor-pointer rounded bg-primary-500 py-1 px-2 text-xs font-bold uppercase">
      Pro
    </div>
  );

  return (
    <div>
      <Popover
        open={open}
        trigger={trigger ? trigger : badge}
        onOpenChange={setOpen}
        className="!bg-black !p-5"
      >
        <p className="mb-3">{content}</p>
        <Button className="w-full justify-center" color={ButtonColor.Accent} link="/users/billing">
          Get Streali Pro
        </Button>
      </Popover>
    </div>
  );
}
