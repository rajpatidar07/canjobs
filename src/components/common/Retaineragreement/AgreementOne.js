// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import { PDFViewer } from "@react-pdf/renderer";
// import { useLocation } from 'react-router-dom';
// const AggrementOne = () => {
//   // const signature = window.history.state.usr.dataUrl
//   // const htmlCode =window.history.state.usr.htmlCode
//   // console.log(window)
//   const testvalue = useLocation();
//     let code= testvalue.state
//     const text =  JSON.stringify(code).replace('" <',"<").replace('>"',">")
//     let newText =text.split("\\n").join()
//     let latestCode = newText.split(">,").join(">")
//     console.log( latestCode.trim())
//   // Function to convert the provided string into React PDF Renderer components
//   // const convertStringToComponent = (str) => {
//   //   const lines = str.split('\\n').map(line => line.trim()).filter(line => line !== '');

//   //   const components = lines.map((line, index) => {
//   //     if (line.startsWith('<Text>')) {
//   //       return <Text key={index}>{line.replace('<Text>', '').replace('</Text>', '')}</Text>;
//   //     } else if (line.startsWith('<h1>')) {
//   //       return <Text key={index} style={styles.header}>{line.replace('<h1>', '').replace('</h1>', '')}</Text>;
//   //     } else if (line.startsWith('<h2>')) {
//   //       return <Text key={index} style={styles.subHeader}>{line.replace('<h2>', '').replace('</h2>', '')}</Text>;
//   //     } else if (line.startsWith('<View>')) {
//   //       return (
//   //         <View key={index} style={styles.section}>
//   //           {line.split('|').map((item, i) => <Text key={i} style={styles.text}>{item}</Text>)}
//   //         </View>
//   //       );
//   //     }
//   //     return null;
//   //   });

//   //   return components;
//   // };
//     // Function to convert the provided string into React PDF Renderer components
//   //   const convertStringToComponent = (str) => {
//   //     const lines = str.split('\n').map(line => line.trim()).filter(line => line !== '');
//   // console.log( document.createTextNode(str))
//   //     const components = lines.map((line, index) => {
//   //       if (line.startsWith('<Text>')) {
//   //         return <Text key={index}>{line.replace('<Text>', '').replace('</Text>', '')}</Text>;
//   //       } else if (line.startsWith('<h1>')) {
//   //         return <Text key={index} style={styles.header}>{line.replace('<h1>', '').replace('</h1>', '')}</Text>;
//   //       } else if (line.startsWith('<h2>')) {
//   //         return <Text key={index} style={styles.subHeader}>{line.replace('<h2>', '').replace('</h2>', '')}</Text>;
//   //       } else if (line.startsWith('<View>')) {
//   //         return (
//   //           <View key={index} style={styles.section}>
//   //             {line.split('|').map((item, i) => <Text key={i} style={styles.text}>{item}</Text>)}
//   //           </View>
//   //         );
//   //       }
//   //       return null;
//   //     });
//   // let oo=  document.createTextNode(str)
//   //     return oo;
//   // };  
//   return (
//     <PDFViewer width="100%" height="900">
//       <Document>
//         <Page size="A4" style={styles.page}>
//        {latestCode}
//       </Page>
//       </Document>
//     </PDFViewer>
//   );
// };

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontFamily: 'Times-Roman',
//     fontSize: 12,
//     lineHeight: 1.5
//   },
//   section: {
//     marginBottom: 10
//   },
//   header: {
//     fontSize: 14,
//     marginBottom: 10,
//     fontWeight: 'bold'
//   },
//   subHeader: {
//     fontSize: 12,
//     marginBottom: 5,
//     fontWeight: 'bold'
//   },
//   text: {
//     marginBottom: 5,
//     padding: 2
//   },
//   image: {
//     width: '30%',
//     height: 'auto',
//     marginBottom: 10
//   },
//   initial: {
//     marginTop: 100,
//     textAlign: 'right',

//   },
//   signatureImage: {
//     textDecoration: "underline",
//     marginHorizontal: 480,
//     marginVertical: -100,
//     width: 80,
//     height: 80,
//     marginBottom: 20,
//   },
//   textunderline: {
//     textDecoration: "underline"
//   }
// });

// export default AggrementOne;
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import { AddSharePointDOcument } from '../../../api/api';
import { toast } from 'react-toastify';

const AggrementOne = () => {
  const [blobData, setBlobData] = useState()
  const { user_id, emp_user_type, folderId: folderID, code } = useLocation().state;
  const latestCode = JSON.stringify(code)
    .replace('" <', "<")
    .replace('>"', ">")
    .replace(/\\n/g, "")
    .replace(/>,/g, ">");
  // Function to convert the provided string into React PDF Renderer components
  const convertStringToComponent = (str) => {
    const htmlParser = new DOMParser();
    const doc = htmlParser.parseFromString(str, 'text/html');

    const convertNodeToComponent = (node) => {
      if (node.nodeType === 3) { // text node
        return node.textContent;
      }

      const { tagName, attributes, childNodes } = node;
      const children = Array.from(childNodes).map(convertNodeToComponent);

      const style = {};
      if (attributes.style) {
        attributes.style.value.split(';').forEach((styleRule) => {
          const [key, value] = styleRule.split(':');
          if (key && value) {
            style[key.trim()] = value.trim();
          }
        });
      }
      switch (tagName) {
        case 'TEXT':
          return <Text style={style}>{children}</Text>;
        case 'H1':
          return <Text style={[styles.header, style]}>{children}</Text>;
        case 'H2':
          return <Text style={[styles.subHeader, style]}>{children}</Text>;
        case 'VIEW':
          return <View style={[styles.section, style]}>{children}</View>;
        case 'IMG':
          return <Image style={[styles.image, style]} src={node.getAttribute('src')} />;
        default:
          return <Text style={style}>{children}</Text>;
      }
    };

    const components = Array.from(doc.body.childNodes).map(convertNodeToComponent);
    return components;
  };

  const components = convertStringToComponent(latestCode.trim());
  /*COnvert blob to file  */
  useEffect(() => {

    const convertBlob = async () => {
      try {
        if (!blobData) {
          console.error('Invalid blob data');
          return;
        }
        const arrayBuffer = await blobData.arrayBuffer();
        const newBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
        if (!newBlob) {
          console.error('Failed to create new blob');
          return;
        }
        const file = new File([newBlob], 'filename.pdf', { type: 'application/pdf' });
        try {
          let res = await AddSharePointDOcument(
            user_id,
            emp_user_type,
            folderID,
            "",
            [file]
          );
          if (res.data.message === "Document Upload") {
            toast.success(`Document Uploaded successfully`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
          // console.log(res.data)
          if (res.data.message === "Failed" && res.data.data === "No Token Found") {
            toast.success(`Document Uploaded successfully`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
        } catch (error) {
          console.log("Error saving doc to sharepoint", error)
        }
      } catch (error) {
        console.error('Error converting blob to file:', error);
      }
    };
    convertBlob()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blobData])

  return (
    <BlobProvider document={
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Image fixed style={styles.image}
              src={"https://canpathwaysjobs.com/image/00logo-main-black.png"} />
            {components}
            <View className="footer" fixed style={{ color: "red", textAlign: "center" }}>
              <Text>Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada | Tel.: 403.888.5308 |</Text>
              <Text style={{ color: "blue", textDecoration: "underline" }}>Email: info@canpathways.ca | Website: www.canpathways.ca</Text>
            </View>
            <View className="initial" fixed style={styles.initial}>
              <Text>Initial:</Text>
            </View>
          </View>
        </Page>
      </Document>}>
      {({ blob, url, loading, error }) => {
        setBlobData(blob)
        // Do whatever you need with blob here
        return <PDFViewer width="100%" height="900">
          <Document>
            <Page size="A4" style={styles.page}>
              <View>
                <Image fixed style={styles.image} src={"https://canpathwaysjobs.com/image/00logo-main-black.png"} />
                {components}

                <View className="footer" fixed style={{ color: "red", textAlign: "center" }}>
                  <Text>Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada | Tel.: 403.888.5308 |</Text>
                  <Text style={{ color: "blue", textDecoration: "underline" }}>Email: info@canpathways.ca | Website: www.canpathways.ca</Text>
                </View>
                <View className="initial" fixed style={styles.initial}>
                  <Text>Initial:</Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>;
      }}
    </BlobProvider>
  );
};
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    lineHeight: 1.5
  },
  section: {
    // marginBottom: 10
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  text: {
    marginBottom: 5,
    padding: 2
  },
  image: {
    width: '30%',
    height: 'auto',
    // marginBottom: 10
  },
  initial: {
    // marginTop: 10,
    textAlign: 'right'
  },
  textunderline: {
    textDecoration: "underline"
  }
});

export default AggrementOne;
