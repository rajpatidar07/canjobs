import React from "react";
import PSPDFKit from "pspdfkit";

export default function AdobePDFViewer({ url, data }) {
    const configuration = {
        document: new PSPDFKit.Document(url),
        licenseKey: 'cF6D-jxIY0iG3YSYeTiVDrV78npe1D7z9t_V3vxEaNrE4vyVgo88mqO7fpiZiQyrXcEYw5A8yC5a23ncanYYCu-rk3UKvkKH8EWvuxcRebigT5-o7tbXOdl5Fuzho3Y0BEa_Sk3scSnixH8-Y8jdAaOk4Idq4PHjtxMeLyMyjWfDX1Y4VUfABnQXNS7ygfMyJsit_6y2QpRucg',
        toolbar: true,
        sidebar: true,
        annotations: [],
        search: true,
        print: true
    };
    return (
        <PSPDFKit
            document={new PSPDFKit.Document(url)}
            configuration={configuration}
        />
    );

}
import React, { useEffect, useRef } from "react";

export default function AdobePDFViewer({url,data}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current; // This `useRef` instance will render the PDF.

    let PSPDFKit, instance;
    
    (async function () {
      PSPDFKit = await import("pspdfkit")

		PSPDFKit.unload(container) // Ensure that there's only one PSPDFKit instance.

      instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: data.name, 
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: url
      });
    })();
    
    return () => PSPDFKit && PSPDFKit.unload(container)
  }, []);
  
  // This div element will render the document to the DOM.
  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
}