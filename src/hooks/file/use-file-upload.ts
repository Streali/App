import { useMutation } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { apiClient } from '~/utils/axios/axios';
import { FileToType } from '~/utils/common/file-to-type';

export function useFileUpload() {
  return useMutation(async (params: File) => {
    const media = new FormData();
    media.append('file', params);
    media.append('name', params.name);
    media.append('type', FileToType(params.type));

    const { data } = await apiClient.post('/media', media);

    toastr(ToastType.Success, `File uploaded!`, `${params.name} is successfully uploaded!`);

    return data;
  });
}
