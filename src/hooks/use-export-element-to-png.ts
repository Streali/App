import html2canvas from 'html2canvas';

export function useExportElementToPng() {
  const exportElement = (element: HTMLDivElement) => {
    html2canvas(element).then((canva) => {
      const image = new Image();
      image.src = canva.toDataURL();
      document.body.appendChild(image);
      image.setAttribute('download', 'image.png');
    });
  };

  return {
    exportElement,
  };
}
