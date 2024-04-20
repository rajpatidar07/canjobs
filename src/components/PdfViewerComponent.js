import React, { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadPSPDFKit = async () => {
      try {
        const PSPDFKit = await import("pspdfkit");
        const container = containerRef.current;

        if (!container) {
          throw new Error("Container element not found.");
        }

        await PSPDFKit.load({
          container,
          license: "YOUR_PSPDFKIT_LICENSE_KEY",
          document: props.document,
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });
      } catch (error) {
        console.error("Error loading PSPDFKit:", error);
      }
    };

    loadPSPDFKit();

    return () => {
      const container = containerRef.current;
      if (container && window.PSPDFKit) {
        window.PSPDFKit.unload(container);
      }
    };
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
