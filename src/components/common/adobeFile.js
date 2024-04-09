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
            const adobeDCView = new window.AdobeDC.View({
                clientId: '5bfcbeb2d14c49bf95f73dc0eed7f390',
                divId: 'adobe-dc-view'
            });
            adobeDCView.previewFile(
                {
                    content: {
                        location: {
                            url: 'https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=dcfbeaf7-d264-4c9b-a295-e996d12ef74d&Translate=false&tempauth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiY2lkIjoiOW93Y3lZOUtHMGEySmZyTDFSc2ZBQT09IiwiZW5kcG9pbnR1cmwiOiIxQnFEaUlKM2t3OGtnKzFZMU1zK0hRVk8xZHNRbXVNR05IWmkzMzBUTzNrPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTQ0IiwiZXhwIjoiMTcxMjY0NzkxMiIsImlwYWRkciI6IjIwLjE5MC4xNzUuMTUyIiwiaXNsb29wYmFjayI6IlRydWUiLCJpc3MiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAiLCJuYW1laWQiOiJkMTAxYzhhZC1lMjYzLTRjMGEtOGRiMy0zYmEyYWQxZjhlYTZANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwibmJmIjoiMTcxMjY0NDMxMiIsInJvbGVzIjoiYWxsc2l0ZXMud3JpdGUgYWxsZmlsZXMud3JpdGUgYWxsZmlsZXMucmVhZCBhbGxzaXRlcy5mdWxsY29udHJvbCIsInNpdGVpZCI6Ill6azRNVFE0T0RrdE5EWmlNUzAwTlRVNExUbG1ZVGt0TmpjMU1qWXlaVFV5WVdGayIsInR0IjoiMSIsInZlciI6Imhhc2hlZHByb29mdG9rZW4ifQ.STSjYb8tRnzX_w-0SajmwnO4mxmUjkWANCQrOGNmIC8&ApiVersion=2.0',
                        },
                    },
                },
                {
                    metaData: {
                        fileName: 'sunflower.jpg',
                    },
                }
            );
        };

        loadAdobeSDK();
    }, []);

    return <div id="adobe-dc-view"></div>;
};

export default AdobePDFViewer;
