import { Button, ButtonColor } from '~/components/button/button';
import { PopoverNavigation } from '~/components/popover/navigation/popover-navigation';
import { Popover } from '~/components/popover/popover';
import { toastr, ToastType } from '~/components/toast/toast';
import { useDeleteLabel } from '~/hooks/label/use-delete-label';
import { useExportLabel } from '~/hooks/label/use-export-label';
import { LabelData, LabelResponse } from '~/types/schemas/label';
import LabelElement from '../label-element.tsx/label-element';
import { useDuplicateLabel } from '~/hooks/label/use-duplicate-label';

type LabelCardProps = {
  label: LabelResponse;
  labelData: LabelData;
};
const LabelCard = (props: LabelCardProps) => {
  const { label, labelData } = props;

  const [menuOpen, setMenuOpen] = useState(false);

  const { mutate: duplicateLabel } = useDuplicateLabel();
  const { mutate: deleteLabel } = useDeleteLabel();
  const { mutate: exportEventList } = useExportLabel();

  return (
    <>
      <div className=" flex h-[250px] w-full items-center justify-center overflow-hidden  rounded-t-lg border border-dark-400 bg-dark-600 p-6">
        <LabelElement theme={label.theme} data={labelData} />
      </div>
      <div className="flex items-center justify-between rounded-b-lg bg-dark-400 py-3 pl-6 pr-3 transition-colors duration-200 hover:bg-primary-500">
        <h2 className="font-medium">{label.title}</h2>
        <Popover
          open={menuOpen}
          onOpenChange={setMenuOpen}
          align="end"
          side="bottom"
          trigger={<Button iconLeft="more-line" color={ButtonColor.Black} />}
        >
          <PopoverNavigation
            onLinkClick={() => setMenuOpen(false)}
            links={[
              {
                title: 'Edit',
                link: `/labels/${label.secret}/edit`,
                icon: 'edit-box-line',
              },
              {
                title: 'Duplicate',
                onClick: () => {
                  duplicateLabel(label.id);
                },
                icon: 'clipboard-line',
              },
              {
                title: 'Embed',
                onClick: () => {
                  navigator.clipboard.writeText(
                    `${window.location.origin.toString()}/labels/${label.secret}/embed`
                  );
                  toastr(
                    ToastType.Success,
                    'Embed link copied',
                    'You can use this link on your streaming software'
                  );
                },
                icon: 'file-copy-line',
              },
              {
                title: 'Export',
                onClick: () => {
                  exportEventList(label.theme);
                },
                icon: 'file-code-line',
              },
              {
                title: 'Delete',
                icon: 'delete-bin-line',
                color: 'error',
                confirm: {
                  title: 'Delete label',
                  text: 'Are you sure you want to delete this label?',
                  word: label.title,
                  confirmText: 'For delete this label, type the name of the label',
                  textButton: 'Delete',
                  onConfirm: () => {
                    label.id && deleteLabel(label.id);
                  },
                },
              },
            ]}
          />
        </Popover>
      </div>
    </>
  );
};

export default LabelCard;
