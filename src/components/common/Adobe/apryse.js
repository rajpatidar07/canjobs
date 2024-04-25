// import React,{ useEffect ,useRef} from "react";
// import WebViewer from '@pdftron/webviewer'
// export default function Apryse({url,data}) {
//     const viewer = useRef(null);
//     useEffect(() => {
//         WebViewer(
//           {
//             path: '../../../../node_modules/@pdftron/webviewer',
//             licenseKey: '1713422319752:7fef935203000000006fb499fddf00798584f9e558f7afc28444d3c1fb',
//             initialDoc: url,
//           },
//           viewer.current,
//         ).then((instance) => {
//             const { documentViewer } = instance.Core;
//             // you can now call WebViewer APIs here...
//           });
//       }, []);

//   return (
//     <div className="MyComponent">
//       <div className="header">React sample</div>
//       <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
//     </div>
//   )
// }
import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';

const Apryse = ({url}) => {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const initializeWebViewer = async () => {
      if (!viewer.current || viewer.current.innerHTML.trim() !== '') return;

      try {
        const instance = await WebViewer({
          path: '/node_modules/@pdftron/webviewer', // Corrected path to the WebViewer package
          initialDoc: url,
          licenseKey: '7fef935203000000006fb499fddf00798584f9e558f7afc28444d3c1fb'
        }, viewer.current);
console.log(instance)
        setInstance(instance);
      } catch (error) {
        console.error('Error initializing WebViewer:', error);
      }
    };

    initializeWebViewer();

    return () => {
      if (instance) {
        instance.closeElements(); // Close the WebViewer instance when component unmounts
      }
    };
  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default Apryse;
