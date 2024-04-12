import React/*, { useEffect } */from 'react';
// import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewSDKClient from './ViewSDKClient.js';
const AdobePDFViewer = (url) => {
const [state/*, setState*/] = React.useState({isDataLoaded: true, menuLink: url
, hasFile: url
});
// useEffect(() => {
// axios.get(`${process.env.REACT_APP_BASE_URL}/get_menu`)
// .then(response => setState({isDataLoaded: true, hasFile: response.data.has_file, menuLink: response.data.menu_link}))
// .catch(error => alert(error.message))
// }, []);
const loadPDF = () => {
const viewSDKClient = new ViewSDKClient();
viewSDKClient.ready().then(() => {
viewSDKClient.previewFile("pdf-div", {showAnnotationTools: false, showLeftHandPanel: false, showPageControls: false,
showDownloadPDF: false, showPrintPDF: false}, state.menuLink);
});
}
return (
<div >
{
state.isDataLoaded ?
<div>
{
state.hasFile ?
<>
<div id="pdf-div" className="full-window-div" onDocumentLoad={loadPDF()}></div>
</>
:
<div>
<p className='text dashboard' id="no-file">Sorry, no file at this link</p>
</div>
}
</div>
:
<div className='cp'>
<CircularProgress  style={{color: '#ffc107'}} />
</div>
}
</div>
);
}
export default AdobePDFViewer;