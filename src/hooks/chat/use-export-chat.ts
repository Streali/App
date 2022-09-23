import { useMutation } from '@tanstack/react-query';
import { ChatExportThemeSchema } from '../../types/schemas/chat';
import { apiClient } from '../../utils/axios/axios';
import { toastr, ToastType } from '../../utils/toast/toast';

export const UseExportChatTheme = () => {
  return useMutation(
    async (themeId: string) => {
      const { data } = await apiClient.get(`/chat-themes/${themeId}`);
      const parseData = ChatExportThemeSchema.parse(data);

      const blob = new Blob([new TextEncoder().encode(JSON.stringify(parseData))], {
        type: 'application/json',
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${data.title}.json`);
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
