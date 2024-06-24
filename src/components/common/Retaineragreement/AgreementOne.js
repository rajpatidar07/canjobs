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
import React from 'react';
import { pdf, Document, Page, Text, View, StyleSheet, Image, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';

const AggrementOne = () => {
  const testvalue = useLocation();
  let code = testvalue.state;

  const text = JSON.stringify(code).replace('" <', "<").replace('>"', ">");
  let newText = text.split("\\n").join("");
  let latestCode = newText.split(">,").join(">");

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

  return (
    <PDFViewer width="100%" height="900">
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
          <Image fixed style={styles.image} src={'https://storage.googleapis.com/mmstudio-images/gallery/AGUBlh69w0N2AXPYQJJy0zx0x363/1712771136849-0.png'} />
          {components}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
const blob = () => (
  <div>
    <BlobProvider document={AggrementOne}>
      {({ blob, url, loading, error }) => {
        console.log("blob",blob,"url",url,"loading",loading,"error",error)
        // Do whatever you need with blob here
        return <div>There's something going on on the fly</div>;
      }}
    </BlobProvider>
  </div>
);
console.log( blob)
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    lineHeight: 1.5
  },
  section: {
    marginBottom: 10
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
    marginBottom: 10
  },
  initial: {
    marginTop: 100,
    textAlign: 'right'
  },
  signatureImage: {
    textDecoration: "underline",
    marginHorizontal: 480,
    marginVertical: -100,
    width: 80,
    height: 80,
    marginBottom: 20
  },
  textunderline: {
    textDecoration: "underline"
  }
});

export default AggrementOne;
