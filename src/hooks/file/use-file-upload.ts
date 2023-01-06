import { useMutation } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { FileToType } from '~/utils/common/file-to-type';
import { http } from '~/utils/http/client';

export function useFileUpload() {
  return useMutation(async (params: File) => {
    const media = new FormData();
    media.append('file', params);
    media.append('name', params.name);
    media.append('type', FileToType(params.type).toString());

    const data = await http.post('media', { body: media });

    toastr(ToastType.Success, `File uploaded!`, `${params.name} is successfully uploaded!`);

    return data;
  });
}
