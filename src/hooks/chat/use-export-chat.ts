import { useMutation } from '@tanstack/react-query';
import { ChatExportThemeSchema, ChatTheme } from '../../types/schemas/chat';
import { toastr, ToastType } from '../../utils/toast/toast';

export const useExportChatTheme = () => {
  return useMutation(
    async (theme: ChatTheme) => {
      const parseData = ChatExportThemeSchema.parse(theme);

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
        toastr(ToastType.Success, 'Theme exported', 'Your theme is successfully exported !');
      },
    }
  );
};
