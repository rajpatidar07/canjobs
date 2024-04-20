import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        license:
          "zFV8P9YHvxGpBc0Tp-W4cg6Fl-zD9VyTWQGiJTi1A0pM18iMZUQDrARKsunUn4oFAuan32RJzCDR--1nglDFAeacyOumrQOdc7aLnh0zkUHLoL9ZIyYS885cFaZySBalYNU4cbnmdUaZUlte0UEfoF8wM-_lJnbFYTYyWvpuPQ7BICRjm9_SGVz9V8bQGEU3OjpqY_YsvjfyRw",
        // The document to open.
        document: props.document,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
