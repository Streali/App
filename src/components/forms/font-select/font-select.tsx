import { SingleValue } from 'react-select';
import { GoogleFontsFamily, useGoogleFont } from '../../../hooks/fonts/useGoogleFont';
import { Select } from '../select/select';

export interface FontSelectProps {
  className?: string;
  onChange?: (font: string, variants: { label: string; value: string }[]) => void;
  value: string;
  disabled?: boolean;
  label?: string;
}

export const FontSelect = (props: FontSelectProps) => {
  const { className, onChange, value, disabled, label } = props;
  const { data: fonts } = useGoogleFont();

  const convertFontWeight = (weight: string) => {
    switch (weight) {
      case '100':
        return 'Thin';
      case '200':
        return 'Extra Light';
      case '300':
        return 'Light';
      case '400':
        return 'Regular';
      case '500':
        return 'Medium';
      case '600':
        return 'Semi Bold';
      case '700':
        return 'Bold';
      case '800':
        return 'Extra Bold';
      case '900':
        return 'Black';
      default:
        return weight;
    }
  };

  function handleFontChange(value: SingleValue<{ value: string; label: string }>) {
    const font = fonts?.find((f: GoogleFontsFamily) => f.family === value?.value);
    const variants = font?.variants.filter((v: string) => !v.includes('italic'));

    if (font) {
      onChange &&
        onChange(
          font.family,
          variants ? variants?.map((v: string) => ({ label: convertFontWeight(v), value: v })) : []
        );
    }
  }

  return (
    <Select
      label={label}
      className={className}
      onChange={handleFontChange}
      disabled={disabled}
      defaultValue={{ label: value, value: value }}
      placeholder="Select font"
      options={
        fonts
          ? fonts.map((font: GoogleFontsFamily) => {
              return {
                label: font.family,
                value: font.family,
              };
            })
          : []
      }
    />
  );
};
