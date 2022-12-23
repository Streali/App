export const FileToType = (fileType: string) => {
  if (fileType.includes('image')) return 0;
  if (fileType.includes('video')) return 1;
  if (fileType.includes('audio')) return 2;
  if (fileType.includes('json')) return 3;
  return 0;
};
