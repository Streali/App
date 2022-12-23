import Dropzone from 'react-dropzone';
import { Button, ButtonSize } from '~/components/button/button';
import { toastr, ToastType } from '~/components/toast/toast';

export interface FileProps {
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: { [key: string]: string[] };
  disabled?: boolean;
  className?: string;
}

export function File(props: FileProps) {
  const { onChange, maxFiles = 1, maxSize = 1, accept, disabled = false, className = '' } = props;
  const [dragOver, setDragOver] = useState(false);
  const sizeConversion = maxSize * 1000000;
  const [fileName, setFileName] = useState<string[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFileName(acceptedFiles.map((file) => file.name));
    onChange && onChange(acceptedFiles);
  };

  return (
    <Dropzone
      onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
      onDropRejected={() => toastr(ToastType.Error, 'Error', 'File is too large')}
      onError={(error) => {
        console.log(error);
        toastr(ToastType.Error, 'Error', error.message);
      }}
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      maxFiles={maxFiles}
      accept={accept}
      maxSize={sizeConversion}
      multiple={maxFiles > 1}
      disabled={disabled}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div
            {...getRootProps()}
            className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-dark-300 transition-colors duration-300 hover:border-primary-300 ${
              dragOver ? 'border-primary-300' : ''
            } ${
              disabled ? 'cursor-not-allowed bg-dark-400 hover:border-dark-300' : ''
            } ${className}`}
          >
            <input {...getInputProps()} />
            {fileName.length === 0 && (
              <>
                <Button size={ButtonSize.Very_Small} disabled={disabled} className="mb-3">
                  Choose the file
                </Button>
                <p className="text-center text-xs">
                  Drop some files here, or click to select files
                </p>
              </>
            )}
            {fileName.length > 0 && (
              <>
                <Button size={ButtonSize.Very_Small} className="mb-3">
                  Change the file
                </Button>
                <p className="text-center text-xs">{fileName.join(', ')}</p>
              </>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}
