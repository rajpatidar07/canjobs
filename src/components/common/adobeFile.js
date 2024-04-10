
import React, { useEffect } from 'react';

const AdobePDFViewer = () => {
  useEffect(() => {
    const loadAdobeSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
      script.async = true;
      script.onload = initializeAdobeViewer;
      document.body.appendChild(script);
    };

    const initializeAdobeViewer = () => {
      const adobeDC = window.AdobeDC;
      if (adobeDC) {
        const adobeDCView = new adobeDC.View({
          clientId: '5bfcbeb2d14c49bf95f73dc0eed7f390',
          divId: 'adobe-dc-view',
        });
        adobeDCView.previewFile({
          content: {
            promise: Promise.resolve({
              location: {
                url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              },
            }),
          },
          metaData: {
            fileName: 'your-pdf.pdf',
          },
        });
      } else {
        console.error('AdobeDC is not defined.');
      }
    };

    loadAdobeSDK();
  }, []);

  return <div id="adobe-dc-view"></div>;
};

export default AdobePDFViewer;
