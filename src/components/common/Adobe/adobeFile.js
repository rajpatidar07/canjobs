import React/*, { useEffect } */from 'react';
// import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewSDKClient from './ViewSDKClient.js';
const AdobePDFViewer = ({url,data}) => {
const [state/*, setState*/] = React.useState({isDataLoaded: true, menuLink: url
, hasFile: url
});
console.log(url)
// useEffect(() => {
// axios.get(`${process.env.REACT_APP_BASE_URL}/get_menu`)
// .then(response => setState({isDataLoaded: true, hasFile: response.data.has_file, menuLink: response.data.menu_link}))
// .catch(error => alert(error.message))
// }, []);
const loadPDF = () => {
const viewSDKClient = new ViewSDKClient();
viewSDKClient.ready().then(() => {
viewSDKClient.previewFile("pdf-div", {showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false,
showDownloadPDF: false, showPrintPDF: false}, state.menuLink,data);
});
}
return (
<div style={{height:"100vh"}}>
{
state.isDataLoaded ?
<div style={{height:"100vh"}}>
{
state.hasFile ?
<>
<div id="pdf-div" className="full-window-div" onDocumentLoad={loadPDF()} style={{height:"100vh"}}></div>
</>
:
<div style={{height:"100vh"}}>
<p className='text dashboard' id="no-file">Sorry, no file at this link</p>
</div>
}
</div>
:
<div className='cp' >
<CircularProgress  style={{color: '#ffc107'}} />
</div>
}
</div>
);
}
export default AdobePDFViewer;
// import React from "react";
// import PSPDFKit from "pspdfkit";

// export default function AdobePDFViewer({ url, data }) {
//     const configuration = {
//         document: new PSPDFKit.Document(url),
//         licenseKey: 'cF6D-jxIY0iG3YSYeTiVDrV78npe1D7z9t_V3vxEaNrE4vyVgo88mqO7fpiZiQyrXcEYw5A8yC5a23ncanYYCu-rk3UKvkKH8EWvuxcRebigT5-o7tbXOdl5Fuzho3Y0BEa_Sk3scSnixH8-Y8jdAaOk4Idq4PHjtxMeLyMyjWfDX1Y4VUfABnQXNS7ygfMyJsit_6y2QpRucg',
//         toolbar: true,
//         sidebar: true,
//         annotations: [],
//         search: true,
//         print: true
//     };
//     return (
//         <PSPDFKit
//             document={new PSPDFKit.Document(url)}
//             configuration={configuration}
//         />
//     );

// }
// import React, { useEffect, useRef } from "react";

// export default function AdobePDFViewer({url,data}) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current; // This `useRef` instance will render the PDF.

//     let PSPDFKit, instance;
    
//     (async function () {
//       PSPDFKit = await import("pspdfkit")

// 		PSPDFKit.unload(container) // Ensure that there's only one PSPDFKit instance.

//       instance = await PSPDFKit.load({
//         // Container where PSPDFKit should be mounted.
//         container,
//         // The document to open.
//         document: data.name, 
//         // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
//         baseUrl: url
//       });
//     })();
    
//     return () => PSPDFKit && PSPDFKit.unload(container)
//   }, []);
  
//   // This div element will render the document to the DOM.
//   return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
// }