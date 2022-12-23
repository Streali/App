export const FileTypeToTag = (fileType: string) => {
  if (fileType.includes('image')) return 'Image';
  if (fileType.includes('video')) return 'Video';
  if (fileType.includes('audio')) return 'Audio';
  if (fileType.includes('text')) return 'Text';
  if (fileType.includes('json')) return 'JSON';
  if (fileType.includes('pdf')) return 'PDF';
  if (fileType.includes('zip')) return 'ZIP';
  if (fileType.includes('rar')) return 'RAR';
  if (fileType.includes('tar')) return 'TAR';
  if (fileType.includes('gzip')) return 'GZIP';
  if (fileType.includes('7z')) return '7Z';
  if (fileType.includes('msword')) return 'Word';
  return 'Unknown';
};
