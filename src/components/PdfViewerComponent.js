import React, { useEffect, useRef } from "react";
import PSPDFKit from "pspdfkit";
// import { toolbarCustomBreakpoint } from "../../_server/components/example/utils";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
  const isLoadingNotes = useRef(false);
  // const documentID = "YOUR_DOCUMENT_ID"; // Replace YOUR_DOCUMENT_ID with the actual document ID
  // Function to create a note object
  const createPdfNote = (noteJson) => {
    return new Promise((resolve, reject) => {
      // Simulate API call or async operation
      setTimeout(() => {
        // console.log("Note created:", (noteJson));
        resolve({
          "bbox": noteJson.createdNote[5]._values._tail.array,
          "blendMode": "multiply",
          "createdAt": noteJson.createdNote[10],
          "id": noteJson.createdNote[0],
          "name": noteJson.createdNote[1],
          "opacity": noteJson.createdNote[4],
          "pageIndex": noteJson.createdComments.pageIndex,
          // "strokeColor": "#2293FB",
          // "strokeWidth": 5,
          "type": "pspdfkit/markup/highlight",
          "rects": [[150, 275, 120, 70]],
          "color": "#ffff00",
          "updatedAt": noteJson.createdNote[11],
          "v": 1,
          // "note": "<p>gggggggg</p>",
          "creatorName": noteJson.createdNote[9],
          "rootId": noteJson.createdComments.rootId,
          "pdfObjectId": null,
          "text": {
            "format": noteJson.createdComments.text.format,
            "value": noteJson.createdComments.text.value
          },
          "customData": null,
          "mentionId": noteJson.mentionId ? noteJson.mentionId : ""

        }); // Simulated response with an ID
      }, 1000);
    });
  };
  // Define toSerializableObject function here as well
  function toSerializableObject(obj) {
    return { ...obj }; // Just returning a shallow copy of the object for demonstration
  }
  let annotedata = [
    //     {
    //   bbox: [100, 150, 200, 75],
    //   blendMode: "normal",
    //   createdAt: "1970-01-01T00:00:00Z",
    //   id: "01F73GJ4RPENTCMFSCJ5CSFT5G",
    //   name: "01F73GJ4RPENTCMFSCJ5CSFT5G",
    //   opacity: 1,
    //   pageIndex: 0,
    //   strokeColor: "#2293FB",
    //   strokeWidth: 5,
    //   type: "pspdfkit/shape/rectangle",
    //   updatedAt: "1970-01-01T00:00:00Z",
    //   v: 1,
    //   note:"Hello"
    // },
    // {
    //   "bbox": [
    //     72.36300659179688,
    //     246.2462158203125,
    //     47.91718750000001,
    //     21.29609375000001
    //   ],
    //   "blendMode": "multiply",
    //   "createdAt": "2024-04-26T12:42:02.244Z",
    //   "id": "01HWD6TKM3D8W31NM6JJCE70NC",
    //   "name": "01HWD6TKM3D8W31NM6JJCE70NC",
    //   "opacity": 2,
    //   "pageIndex": 2,
    //   "type": "pspdfkit/markup/highlight",
    //   "rects": [
    //     [
    //       150,
    //       275,
    //       120,
    //       70
    //     ]
    //   ],
    //   "color": "#ffff00",
    //   "updatedAt": "2024-04-26T12:42:02.244Z",
    //   "v": 1,
    //   "creatorName": "Raj",
    //   "rootId": "01HWD6TKM3D8W31NM6JJCE70NC",
    //   "pdfObjectId": null,

    //   "note": "<p><span data-user-id=\"36\">Mayur</span> </p>"
    //   ,
    //   "customData": null,
    //   "mentionId": "36"
    // },// Example of an Instant JSON schema for a markup annotation:
    // {
    //   "v": 1,
    //   "pageIndex": 1,
    //   "bbox": [150, 275, 120, 70],
    //   "opacity": 1,
    //   "pdfObjectId": 200,
    //   "creatorName": "John Doe",
    //   "createdAt": "2012-04-23T18:25:43.511Z",
    //   "updatedAt": "2012-04-23T18:28:05.100Z",
    //   "id": "01F46S31WM8Q46MP3T0BAJ0F84",
    //   "name": "01F46S31WM8Q46MP3T0BAJ0F84",
    //   "type": "pspdfkit/markup/highlight",
    //   "rects": [[150, 275, 120, 70]],
    //   "blendMode": "multiply",
    //   "color": "#ffff00"
    // },
    // {
    //   "v": 1,
    //   "pageIndex": 1,
    //   "bbox": [150, 275, 120, 70],
    //   "opacity": 1,
    //   "pdfObjectId": 200,
    //   "creatorName": "John Doe",
    //   "createdAt": "2012-04-23T18:25:43.511Z",
    //   "updatedAt": "2012-04-23T18:28:05.100Z",
    //   "id": "01F46S31WM8Q46MP3T0BAJ0F84",
    //   "name": "01F46S31WM8Q46MP3T0BAJ0F84",
    //   "type": "pspdfkit/markup/redaction",
    //   "outlineColor": "#ff0000",
    //   "fillColor": "#000000",
    //   "overlayText": "REDACTED",
    //   "repeatOverlayText": true,
    //   "rotation": 0
    // },
    // {
    //   "v": 2,
    //   "pageIndex": 1,
    //   "bbox": [150, 275, 120, 70],
    //   "opacity": 1,
    //   "pdfObjectId": 200,
    //   "creatorName": "John Doe",
    //   "createdAt": "2012-04-23T18:25:43.511Z",
    //   "updatedAt": "2012-04-23T18:28:05.100Z",
    //   "id": "01F46S31WM8Q46MP3T0BAJ0F85",
    //   "name": "01F46S31WM8Q46MP3T0BAJ0F85",
    //   "type": "pspdfkit/text",
      // "text": {
      //   "format": "plain",
      //   "value": "Content for a text annotation"
      // },
    //   "fontSize": 14,
    //   "fontStyle": ["bold"],
    //   "fontColor": "#000000",
    //   "horizontalAlign": "left",
    //   "verticalAlign": "center",
    //   "rotation": 0
    // }
    {
      "type": "pspdfkit/comment",
      "v": 1,
      "rootId": "01F46WTF5X3J1WEN6J2YXWHHEW",
      "pageIndex": 0,
      "pdfObjectId": null,
      "creatorName": null,
      "createdAt": "2021-04-26T10:50:30.650Z",
      "updatedAt": "2021-04-26T10:50:30.650Z",
      "text":  "<p><span data-user-id=\"36\">Mayur</span> </p>",
      "customData": null
    } ]

  useEffect(() => {
    const loadPSPDFKit = async () => {
      try {
        const container = containerRef.current;
        let adminName = localStorage.getItem("admin");

        if (!container) {
          throw new Error("Container element not found.");
        }

        // const instance = await PSPDFKit.load({
        //   container,
        //   license: "YOUR_PSPDFKIT_LICENSE_KEY",
        //   document: props.document,
        //   baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        //   CommentMarkerAnnotation: true,
        //   setOnCommentCreationStart: true,
        //   toolbarItems: PSPDFKit.defaultToolbarItems.concat({ type: "annotate" }),
        //   mentionableUsers: props.adminDetailsFOrMention,
        //   enableRichText: () => true,
        // });
        const instance = await PSPDFKit.load({
          container,
          license: "YOUR_PSPDFKIT_LICENSE_KEY", // Replace with your actual license key
          document: props.document,
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
          CommentMarkerAnnotation: true,
          setOnCommentCreationStart: true,
          toolbarItems: PSPDFKit.defaultToolbarItems.concat({ type: "annotate" }),
          mentionableUsers: props.adminDetailsFOrMention,
          enableRichText: () => true,
        });
        
        instance.setAnnotationCreatorName(adminName.charAt(0).toUpperCase() + adminName.slice(1));


        /* Function to create Annotation note */
        // instance.addEventListener("annotations.create", async createdNote => {
        //   const note = createdNote.get(0);
        //   console.log(note)
        //   const serializedObjectNote = toSerializableObject(note);
        //   const noteJson = serializedObjectNote
        //   if (!isLoadingNotes.current) {
        //     createPdfNote(noteJson).then(response => {
        //       console.log("Note created with ID:", response
        //     ,"fffff",noteJson);
        //     });
        //   }
        // });
        let eventData = {};

        /* Function to create Annotation comment */
        instance.addEventListener("comments.create", async createdComments => {
          eventData.createdComments = createdComments.get(0);
          eventData.mentionId = createdComments.get(0).getMentionedUserIds()._map._root.entries[0][0]
          // console.log("Data from comments.create:", createdComments.get(0).getMentionedUserIds()._map._root.entries[0][0]);
        });

        /* Function to create Annotation note */
        instance.addEventListener("annotations.create", async createdNote => {
          const note = createdNote.get(0);
          const serializedObjectNote = toSerializableObject(note);
          const noteJson = serializedObjectNote;
          if (!isLoadingNotes.current) {
            // Store data from annotations.create in eventData
            eventData.createdNote = noteJson._values._root.array[0].array;
            console.log("Combined eventData:", (eventData));
            createPdfNote(eventData).then(response => {
              console.log("Final data:", response);

            });
          }
        });
        /* Function to Update Annotation comment */
        instance.addEventListener("comments.update", updatedComments => {
          console.log(updatedComments.get(0).id);
        });

        /* Function to Delete Annotation comment */
        instance.addEventListener("comments.delete", deletedComments => {
          console.log(deletedComments.get(0).id);
        });

        instance.setMentionableUsers(props.adminDetailsFOrMention)

        // Your existing code for PSPDFKit configuration and event listeners
        instance.addEventListener("annotations.load", (loadedAnnotations) => {
          console.log("Annotations were loaded", loadedAnnotations.toJS());
        });
        instance.addEventListener("annotations.change", function () {
          console.log("Something in the annotations has changed.");
        });
        /*Json tried to show */
        instance.applyOperations([
          {
            type: "applyInstantJson",
            instantJson: {
              annotations:
                annotedata
              ,
              format: "https://pspdfkit.com/instant-json/v1"
            }
          }
        ]);
        // Create annotations using your functions
        // const annotationsOnFirstPage = await instance.getAnnotations(0);
        // if (annotationsOnFirstPage.size <= 1) {
        //   await instance
        //     .create([
        //       newInkAnnotation(),
        //       newTextAnnotation(),
        //       newEllipseAnnotationAnnotation(),
        //       newHighlightAnnotation(),
        //       newNoteAnnotation(),
        //     ])
        //     .then(instance.ensureChangesSaved)
        //     .then(savedAnnotations => {
        //       console.log("Saved annotations with IDs", savedAnnotations.map(it => it.id).join(", "));
        //     });
        // }

        return instance;
      } catch (error) {
        console.error("Error loading PSPDFKit:", error);
      }
    };

    loadPSPDFKit();

    return () => {
      // eslint-disable-next-line
      const container = containerRef.current;
      if (container && window.PSPDFKit) {
        window.PSPDFKit.unload(container);
      }
    };
    // eslint-disable-next-line
  }, [props.document]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "calc(100vh - 100px)" }}
    />
  );
}


// import React, { useEffect, useRef } from "react";
// export default function PdfViewerComponent(props) {
//   const containerRef = useRef(null);
//   // const ownerId = "owner123"; // Set your desired owner ID
//   // const ownerName = "John Doe"; // Set your desired owner name

//   useEffect(() => {
//     const loadPSPDFKit = async () => {
//       try {
//         const PSPDFKit = await import("pspdfkit");
//         const container = containerRef.current;
//         let adminName=localStorage.getItem("admin")
//         const toolbarItems = PSPDFKit.defaultToolbarItems
//           .concat({ type: 'comment' }) // Add comment tool.
//           .filter((item) => item.type !== 'note'); // Remove note tool.

//         if (!container) {
//           throw new Error("Container element not found.");
//         }

//         const instance = await PSPDFKit.load({
//           container,
//           license: "YOUR_PSPDFKIT_LICENSE_KEY",
//           document: props.document,
//           baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
//           CommentMarkerAnnotation: true,
//           setOnCommentCreationStart: true,
//           toolbarItems,
//           enableRichText: () => true
//         });
//         console.log(instance) 
//       try{  instance.contentDocument.addEventListener(
//           "pointerdown",
//           event => {
//             if (event.target && event.target.getAttribute("01HW2Y4NXRVR440HXAGB926H6G")) {
//               event.preventDefault();
//               event.stopImmediatePropagation();
//               instance.setSelectedAnnotation(
//                 event.target.getAttribute("01HW2Y4NXRVR440HXAGB926H6G")
//               );
//             }
//           },
//           { capture: true }
//         );}catch(err){
//           console.log(err)
//         }
//         instance.setAnnotationCreatorName(adminName.charAt(0).toUpperCase() + adminName.slice(1));
//         /*Function to create Annotation comment */     
//          instance.addEventListener("comments.create", async createdComments => {
//          console.log(createdComments.get(0).id)
//         })
//         /*Function to Update Annotation comment */     
//         instance.addEventListener("comments.update", updatedComments => {
//           console.log(updatedComments.get(0).id)
//         });
//          /*Function to Delete Annotation comment */
//          instance.addEventListener("comments.delete", deletedComments => {
//          console.log(deletedComments.get(0).id)
//         });

//       } catch (error) {
//         console.error("Error loading PSPDFKit:", error);
//       }
//     };

//     loadPSPDFKit();

//     return () => {
//       // eslint-disable-next-line
//       const container = containerRef.current;
//       if (container && window.PSPDFKit) {
//         window.PSPDFKit.unload(container);
//       }
//     };
//   }, [props.document]);

//   return (
//     <div
//       ref={containerRef}
//       style={{ width: "100%", height: "calc(100vh - 100px)" }}
//     />
//   );
// }
