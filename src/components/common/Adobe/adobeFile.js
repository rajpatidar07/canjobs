// import React/*, { useEffect } */from 'react';
// // import axios from 'axios';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import ViewSDKClient from './ViewSDKClient.js';
// const AdobePDFViewer = ({url,data}) => {
// const [state/*, setState*/] = React.useState({isDataLoaded: true, menuLink: url
// , hasFile: url
// });
// console.log(url)
// // useEffect(() => {
// // axios.get(`${process.env.REACT_APP_BASE_URL}/get_menu`)
// // .then(response => setState({isDataLoaded: true, hasFile: response.data.has_file, menuLink: response.data.menu_link}))
// // .catch(error => alert(error.message))
// // }, []);
// const loadPDF = () => {
// const viewSDKClient = new ViewSDKClient();
// viewSDKClient.ready().then(() => {
// viewSDKClient.previewFile("pdf-div", {showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false,
// showDownloadPDF: false, showPrintPDF: false}, state.menuLink,data);
// });
// }
// return (
// <div style={{height:"100vh"}}>
// {
// state.isDataLoaded ?
// <div style={{height:"100vh"}}>
// {
// state.hasFile ?
// <>
// <div id="pdf-div" className="full-window-div" onDocumentLoad={loadPDF()} style={{height:"100vh"}}></div>
// </>
// :
// <div style={{height:"100vh"}}>
// <p className='text dashboard' id="no-file">Sorry, no file at this link</p>
// </div>
// }
// </div>
// :
// <div className='cp' >
// <CircularProgress  style={{color: '#ffc107'}} />
// </div>
// }
// </div>
// );
// }
// export default AdobePDFViewer;
import React, { useEffect } from 'react';

const AdobePDFViewer = ({url,data}) => {
  const urlToPDF =
  url;
  const fileID = data.id;
  const clientID = 'd9b36f468d7a4e4e8b275f13728f1132';
console.log(urlToPDF,fileID)
  const viewerOptions = {
    embedMode: 'FULL_WINDOW',
    defaultViewMode: 'FIT_PAGE',
    showDownloadPDF: true,
    showPrintPDF: true,
    showLeftHandPanel: false,
    showAnnotationTools: true,
    enableAnnotationAPIs: true,
  };

  const annotationManagerConfig = {
    showToolbar: true,
    showCommentsPanel: true,
    downloadWithAnnotations: true,
    printWithAnnotations: true,
  };

  useEffect(() => {
    const previewPDF = (view, pdfURL) => {
      fetch(pdfURL)
        .then((res) => res.blob())
        .then((blob) => {
          var previewPromise = view.previewFile(
            {
              content: { promise: Promise.resolve(blob.arrayBuffer()) },
              metaData: {
                fileName: pdfURL.split('/').slice(-1)[0],
                id: fileID,
              },
            },
            viewerOptions
          );
          createAnnotationManager(previewPromise);
        });
    };

    const createAnnotationManager = (previewPromise) => {
      previewPromise.then((view) => {
        view.getAnnotationManager().then((annotationManager) => {
          annotationManager.setConfig(annotationManagerConfig);
          addAnnotations(annotationManager);
        });
      });
    };

    const addAnnotations = (annotationManager) => {
      var annotationURLs = [
        'https://assets.codepen.io/4479906/underline.json',
        'https://assets.codepen.io/4479906/highlight.json',
        'https://assets.codepen.io/4479906/scribble.json',
      ];
      for (let i = 0; i < annotationURLs.length; i++) {
        var annotURL = annotationURLs[i];
        fetch(annotURL)
          .then((response) => response.json())
          .then((json) => {
            annotationManager.addAnnotations([json]);
          });
      }
    };

    const onAdobeDCViewSDKReady = () => {
      const embeddedView = new window.AdobeDC.View({
        clientId: clientID,
        divId: 'embeddedView',
      });
      previewPDF(embeddedView, urlToPDF, fileID);
    };

    document.addEventListener('adobe_dc_view_sdk.ready', onAdobeDCViewSDKReady);

    return () => {
      document.removeEventListener('adobe_dc_view_sdk.ready', onAdobeDCViewSDKReady);
    };
  }, []);

  // Add arrayBuffer if necessary i.e. Safari
  if (!Blob.prototype.arrayBuffer) {
    Blob.prototype.arrayBuffer = function () {
      return new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.readAsArrayBuffer(this);
      });
    };
  }

  return <div id="embeddedView" />;
};

export default AdobePDFViewer;
