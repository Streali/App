import { Command } from 'cmdk';
import { Icon, IconSVG } from '../icon/icon';
import './cmdk.scss';

interface Command {
  name: string;
  iconName?: string;
  iconSVG?: IconSVG;
  description?: string;
  action?: () => void;
  link?: string;
}

interface CommandGroups {
  label: string;
  commands: Command[];
}

export interface CmdkProps {
  isOpen?: boolean;
  groups: CommandGroups[];
}

export const Cmdk = (props: CmdkProps) => {
  const { groups, isOpen } = props;
  const [open, setOpen] = useState(isOpen || false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleClick = (command: Command) => {
    const { action, link } = command;
    if (action) {
      action();
    }
    if (link) {
      navigate(link);
    }
  };

  return (
    <Command.Dialog
      open={open}
      className="-mt-40 w-full max-w-[640px] rounded-lg border border-dark-300 bg-dark-600 py-2 shadow-xl"
      onOpenChange={setOpen}
      label="Global Command Menu"
    >
      <Command.Input
        placeholder="Search for apps and commands"
        className="w-full bg-transparent px-4 py-2 placeholder:text-light-300 focus-visible:outline-none"
      />
      <Command.List className="custom-scrollbar mt-3 h-80 w-full overflow-y-scroll border-t border-dark-400 px-2 pt-3">
        <Command.Empty className="flex h-16 items-center justify-center text-sm text-dark-100">
          No results found.
        </Command.Empty>

        {groups!.map((group) => (
          <Command.Group
            key={group.label}
            heading={group.label}
            className="mt-2 px-2 text-xs text-light-300"
          >
            {group.commands.map((command, index) => (
              <Command.Item
                key={command.name}
                onSelect={() => handleClick(command)}
                className={`-mx-2 flex h-10 cursor-pointer select-none items-center rounded-lg px-3 text-sm text-white transition-colors duration-100 ease-in hover:bg-dark-400 ${
                  index ? 'mt-1' : 'mt-2'
                }`}
              >
                <div className="flex items-center">
                  {command.iconName && <Icon name={command.iconName} className="mr-1 h-5 w-5" />}
                  {command.iconSVG && <Icon svg={command.iconSVG} className="mr-1 h-5 w-5" />}
                  {command.name}
                </div>
                <div className="flex-1 text-right text-dark-100">{command.description}</div>
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
};
