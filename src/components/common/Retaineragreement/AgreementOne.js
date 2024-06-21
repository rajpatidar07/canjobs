import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from 'react-router-dom';
const AggrementOne = () => {
  // const signature = window.history.state.usr.dataUrl
  // const htmlCode =window.history.state.usr.htmlCode
  // console.log(window)
  const testvalue = useLocation();
    let code= testvalue.state
    const text =  JSON.stringify(code).replace('" <',"<").replace('>"',">")
    console.log(text.split("\n","pppp"))
  // Function to convert the provided string into React PDF Renderer components
  // const convertStringToComponent = (str) => {
  //   const lines = str.split('\\n').map(line => line.trim()).filter(line => line !== '');

  //   const components = lines.map((line, index) => {
  //     if (line.startsWith('<Text>')) {
  //       return <Text key={index}>{line.replace('<Text>', '').replace('</Text>', '')}</Text>;
  //     } else if (line.startsWith('<h1>')) {
  //       return <Text key={index} style={styles.header}>{line.replace('<h1>', '').replace('</h1>', '')}</Text>;
  //     } else if (line.startsWith('<h2>')) {
  //       return <Text key={index} style={styles.subHeader}>{line.replace('<h2>', '').replace('</h2>', '')}</Text>;
  //     } else if (line.startsWith('<View>')) {
  //       return (
  //         <View key={index} style={styles.section}>
  //           {line.split('|').map((item, i) => <Text key={i} style={styles.text}>{item}</Text>)}
  //         </View>
  //       );
  //     }
  //     return null;
  //   });

  //   return components;
  // };
    // Function to convert the provided string into React PDF Renderer components
  //   const convertStringToComponent = (str) => {
  //     const lines = str.split('\n').map(line => line.trim()).filter(line => line !== '');
  // console.log( document.createTextNode(str))
  //     const components = lines.map((line, index) => {
  //       if (line.startsWith('<Text>')) {
  //         return <Text key={index}>{line.replace('<Text>', '').replace('</Text>', '')}</Text>;
  //       } else if (line.startsWith('<h1>')) {
  //         return <Text key={index} style={styles.header}>{line.replace('<h1>', '').replace('</h1>', '')}</Text>;
  //       } else if (line.startsWith('<h2>')) {
  //         return <Text key={index} style={styles.subHeader}>{line.replace('<h2>', '').replace('</h2>', '')}</Text>;
  //       } else if (line.startsWith('<View>')) {
  //         return (
  //           <View key={index} style={styles.section}>
  //             {line.split('|').map((item, i) => <Text key={i} style={styles.text}>{item}</Text>)}
  //           </View>
  //         );
  //       }
  //       return null;
  //     });
  // let oo=  document.createTextNode(str)
  //     return oo;
  // };  
  return (
    <PDFViewer width="100%" height="900">
      <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.header}>
       {text}
                </View>
      </Page>
      </Document>
    </PDFViewer>
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
    textAlign: 'right',

  },
  signatureImage: {
    textDecoration: "underline",
    marginHorizontal: 480,
    marginVertical: -100,
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  textunderline: {
    textDecoration: "underline"
  }
});

export default AggrementOne;