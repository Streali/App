import { useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, ButtonColor } from '../button/button';
import { File } from '../forms/file/file';
import { Input, InputState } from '../forms/input/input';
import { Modal } from '../modal/modal';
import { toastr, ToastType } from '../toast/toast';

export interface ImportProps {
  trigger: React.ReactNode;
  title: string;
  text: string;
  schema: z.AnyZodObject;
  onConfirm?: () => void;
  onSave: (data: FieldValues) => void;
}

export const Import = (props: ImportProps) => {
  const { trigger, title, schema, onSave, onConfirm } = props;
  const { handleSubmit, control } = useForm({});
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState('');
  const [step, setStep] = useState('1');

  const handleInputChange = (e: React.ChangeEvent) => {
    setConfirm((e.target as HTMLInputElement).value);
  };

  const onParseFile = async (files: File[]) => {
    if (files[0].type !== 'application/json') {
      toastr(ToastType.Error, 'Chat Theme Import', 'Incorrect file');
      return setStep('1');
    }

    try {
      const chatImport = schema.parse(JSON.parse(await files[0].text()));
      setStep('2');
      return chatImport;
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (error.issues[0].code === 'invalid_type') {
          toastr(ToastType.Error, 'Chat Theme Import', 'Incorrect file');
        }
      }
    }
  };

  const onSubmit = handleSubmit(async (theme: FieldValues) => {
    if (confirm.length >= 3) {
      onSave(theme);
      setIsOpen(false);
      setConfirm('');
    }
  });

  const handleConfirm = () => {
    if (confirm.length > 3) {
      onConfirm && onConfirm();
      setIsOpen(false);
    }
  };

  return (
    <Modal
      trigger={trigger}
      title={title}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setStep('1');
        setConfirm('');
      }}
    >
      <form onSubmit={onSubmit}>
        {step === '1' && (
          <Controller
            name="import"
            control={control}
            render={({ field: { onChange } }) => (
              <File
                accept={{
                  'application/json': ['.json'],
                }}
                onChange={async (value) => {
                  const parse = await onParseFile(value);
                  onChange(parse);
                }}
              ></File>
            )}
          />
        )}
        {step === '2' && (
          <>
            <Controller
              control={control}
              name="import.title"
              render={({ field: { onChange } }) => (
                <Input
                  type="text"
                  label="Chat Theme Title"
                  state={confirm.length > 3 ? InputState.Success : InputState.Error}
                  onChange={(value) => {
                    handleInputChange(value);
                    onChange(value);
                  }}
                ></Input>
              )}
            />
            <div className="mt-5 flex w-full justify-end">
              <Button
                type="submit"
                color={ButtonColor.Accent}
                disabled={confirm.length < 3}
                onClick={handleConfirm}
              >
                Import
              </Button>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
};
