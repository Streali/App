import { toPng } from 'html-to-image';
import * as domToImage from 'dom-to-image';

export function useExportElementToPng() {
  const exportElement = (element: HTMLDivElement) => {
    // toPng(element).then((dataUrl) => {
    //   const image = new Image();
    //   image.src = dataUrl;
    //   document.body.appendChild(image);
    // });
    domToImage
      .toPng(element)

      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'foo.png';

        if (
          // isFirefox
          window.navigator.userAgent.indexOf('Firefox') !== -1 &&
          window.navigator.userAgent.indexOf('Chrome') === -1
        ) {
          link.target = '_blank';
        }
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  return {
    exportElement,
  };
}
