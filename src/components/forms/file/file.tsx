import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Button, ButtonSize } from '../../button/button';

export interface FileProps {
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: { [key: string]: string[] };
  disabled?: boolean;
  className?: string;
}

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
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      maxFiles={maxFiles}
      accept={accept}
      maxSize={sizeConversion}
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
                <p className="text-xs">Drag 'n' drop some files here, or click to select files</p>
              </>
            )}
            {fileName.length > 0 && (
              <>
                <Button size={ButtonSize.Very_Small} className="mb-3">
                  Change the file
                </Button>
                <p className="text-xs">{fileName.join(', ')}</p>
              </>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}
