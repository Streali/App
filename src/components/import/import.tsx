import { useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, ButtonColor } from '../button/button';
import { File } from '../forms/file/file';
import { Input, InputState } from '../forms/input/input';
import { Modal } from '../modal/modal';

export interface ImportProps {
  trigger: React.ReactNode;
  title: string;
  text: string;
  schema: z.AnyZodObject;
  onSave: (data: FieldValues) => void;
}

export const Import = (props: ImportProps) => {
  const { trigger, title, schema, onSave } = props;
  const { handleSubmit, control } = useForm({});
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState('');
  const [step, setStep] = useState('1');

  const handleInputChange = (e: React.ChangeEvent) => {
    setConfirm((e.target as HTMLInputElement).value);
  };

  const onParseFile = async (files: File[]) => {
    if (files[0].type !== 'application/json') {
      return setStep('1');
    }

    const decode = JSON.parse(await files[0].text());
    try {
      const chatImport = schema.parse(decode);
      setStep('2');
      return chatImport;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setStep('1');
      }
    }
  };

  const onSubmit = handleSubmit(async (theme: FieldValues) => {
    onSave(theme);
    setIsOpen(false);
  });

  return (
    <Modal
      trigger={trigger}
      title={title}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setStep('1');
      }}>
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
                  const test = await onParseFile(value);
                  onChange(test);
                }}></File>
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
                  onChange={(value) => {
                    handleInputChange(value);
                    onChange(value);
                  }}
                  state={InputState.Normal}></Input>
              )}
            />
            <div className="flex w-full justify-end mt-5">
              <Button type="submit" color={ButtonColor.Accent} disabled={confirm.length < 3}>
                Import
              </Button>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
};
