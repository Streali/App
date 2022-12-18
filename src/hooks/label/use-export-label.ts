import { useMutation } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { Label } from '~/types/schemas/label';
import { LabelSchema } from './../../types/schemas/label';

export const useExportLabel = () => {
  return useMutation(
    async (theme: Label) => {
      const parseData = LabelSchema.parse(theme);

      const blob = new Blob([new TextEncoder().encode(JSON.stringify(parseData))], {
        type: 'application/json',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${theme.title}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    {
      onSuccess() {
        toastr(ToastType.Success, 'Label exported', 'Your label is successfully exported !');
      },
    }
  );
};
