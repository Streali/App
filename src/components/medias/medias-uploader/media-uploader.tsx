import { Button, ButtonColor, ButtonSize } from '~/components/button/button';
import { File } from '~/components/forms/file/file';
import { Modal } from '~/components/modal/modal';
import { useFileUpload } from '~/hooks/file/use-file-upload';
import { FileTypeToTag } from '~/utils/common/file-type-to-tag';

interface MediaUploaderProps {
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

const MediaUploader = (props: MediaUploaderProps) => {
  const { trigger, onSuccess } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const { mutate: uploadFile } = useFileUpload();

  const handleFilesUpload = () => {
    files.forEach((file) => {
      uploadFile(file, {
        onSuccess: () => {
          file.name === files[files.length - 1].name && setIsOpen(false);
          onSuccess && onSuccess();
        },
      });
    });
  };

  return (
    <div>
      <Modal
        trigger={trigger}
        title="Upload media"
        open={isOpen}
        onOpenChange={setIsOpen}
        containerClassName="max-h-[80vh] overflow-y-scroll custom-scrollbar !bg-dark-600"
      >
        <File
          onChange={setFiles}
          maxSize={20}
          maxFiles={99}
          viewFileList={false}
          accept={{
            image: ['image/png', 'image/jpeg', 'image/gif'],
            video: ['video/mp4', 'video/webm'],
            audio: ['audio/mpeg', 'audio/ogg'],
            json: ['application/json'],
          }}
        />
        <div className="mt-3 flex flex-col gap-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between rounded bg-dark-400 px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-sm bg-primary-500 py-1 px-2 text-xs font-bold uppercase">
                  {FileTypeToTag(file.type)}
                </span>
                {file.name}
              </div>
              <Button
                buttonIcon="delete-bin-line"
                color={ButtonColor.Error}
                size={ButtonSize.Very_Small}
                onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
              />
            </div>
          ))}
        </div>
        {files.length > 0 && (
          <div className="mt-3 flex justify-end">
            <Button color={ButtonColor.Accent} onClick={handleFilesUpload}>
              Upload
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MediaUploader;
