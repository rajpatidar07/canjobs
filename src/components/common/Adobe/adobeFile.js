import React, { useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewSDKClient from './ViewSDKClient.js';
const AdobePDFViewer = (props) => {
const [state, setState] = React.useState({isDataLoaded: true, menuLink: "https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=5cafd933-c0a4-4ae7-bcec-100489663e38&Translate=false&tempauth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiY2lkIjoiWG5vSnAvQUdMMGlpOGtGQzMra2FJUT09IiwiZW5kcG9pbnR1cmwiOiI1WHYwU2gwRmlNbXFMUlZURTltU1JvdzRGb1JCcXZ0c3h5L2NIQzFyU2dJPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTQ0IiwiZXhwIjoiMTcxMjkxNjQ3NyIsImlwYWRkciI6IjIwLjE5MC4xNzUuMjQiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5hbWVpZCI6ImQxMDFjOGFkLWUyNjMtNGMwYS04ZGIzLTNiYTJhZDFmOGVhNkA0NjM5MmI3ZC0zZmE3LTRjYzgtYjlkZC1iMDVhMWRmOWU3NDUiLCJuYmYiOiIxNzEyOTEyODc3Iiwicm9sZXMiOiJhbGxzaXRlcy53cml0ZSBhbGxmaWxlcy53cml0ZSBhbGxmaWxlcy5yZWFkIGFsbHNpdGVzLmZ1bGxjb250cm9sIiwic2l0ZWlkIjoiWXprNE1UUTRPRGt0TkRaaU1TMDBOVFU0TFRsbVlUa3ROamMxTWpZeVpUVXlZV0ZrIiwidHQiOiIxIiwidmVyIjoiaGFzaGVkcHJvb2Z0b2tlbiJ9.T5hgIT_wvuv7PjXpZj3pplY82M5tfB9UIQC_LxQydSQ&ApiVersion=2.0"
, hasFile: "https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=5cafd933-c0a4-4ae7-bcec-100489663e38&Translate=false&tempauth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiY2lkIjoiWG5vSnAvQUdMMGlpOGtGQzMra2FJUT09IiwiZW5kcG9pbnR1cmwiOiI1WHYwU2gwRmlNbXFMUlZURTltU1JvdzRGb1JCcXZ0c3h5L2NIQzFyU2dJPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTQ0IiwiZXhwIjoiMTcxMjkxNjQ3NyIsImlwYWRkciI6IjIwLjE5MC4xNzUuMjQiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5hbWVpZCI6ImQxMDFjOGFkLWUyNjMtNGMwYS04ZGIzLTNiYTJhZDFmOGVhNkA0NjM5MmI3ZC0zZmE3LTRjYzgtYjlkZC1iMDVhMWRmOWU3NDUiLCJuYmYiOiIxNzEyOTEyODc3Iiwicm9sZXMiOiJhbGxzaXRlcy53cml0ZSBhbGxmaWxlcy53cml0ZSBhbGxmaWxlcy5yZWFkIGFsbHNpdGVzLmZ1bGxjb250cm9sIiwic2l0ZWlkIjoiWXprNE1UUTRPRGt0TkRaaU1TMDBOVFU0TFRsbVlUa3ROamMxTWpZeVpUVXlZV0ZrIiwidHQiOiIxIiwidmVyIjoiaGFzaGVkcHJvb2Z0b2tlbiJ9.T5hgIT_wvuv7PjXpZj3pplY82M5tfB9UIQC_LxQydSQ&ApiVersion=2.0"
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