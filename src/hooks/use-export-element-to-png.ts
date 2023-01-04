import { toPng } from 'html-to-image';

export function useExportElementToPng() {
  const exportElement = (element: HTMLDivElement) => {
    toPng(element).then((dataUrl) => {
      const image = new Image();
      image.src = dataUrl;
      document.body.appendChild(image);
    });
  };

  return {
    exportElement,
  };
}
