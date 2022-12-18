export const LabelValueToText = (value: string) => {
  const regex = /\*\*(.*?)\*\*/g;
  return value.replaceAll(regex, '<span>$1</span>');
};
