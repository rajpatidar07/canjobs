// import React, { useEffect, useRef } from "react";

// export default function PdfViewerComponent(props) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const loadPSPDFKit = async () => {
//       try {
//         const PSPDFKit = await import("pspdfkit");
//         const container = containerRef.current;
//         const toolbarItems = PSPDFKit.defaultToolbarItems
//         // .concat({ type: 'comment' }) // Add comment tool.
//         // .filter((item) => item.type !== 'note'); // Remove note tool.

//         if (!container) {
//           throw new Error("Container element not found.");
//         }

//         const instance = await PSPDFKit.load({
//           container,
//           license: "YOUR_PSPDFKIT_LICENSE_KEY",
//           document: props.document,
//           baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
//           CommentMarkerAnnotation:true ,
//           toolbarItems
//         });   
//         instance.addEventListener("comments.create", createdComments => {
//           const commentList = createdComments.get(0);
//           console.log(commentList)
//           if (commentList && commentList.forEach) {
//             commentList.forEach(comment => comment.getMentionedUserIds());
//           }
//         });

//         instance.addEventListener("comments.update", updatedComments => {
//           const commentList = updatedComments.get(0);
//           console.log(updatedComments,commentList)
//           if (commentList && commentList.forEach) {
//             commentList.forEach(comment => comment.getMentionedUserIds());
//           }
//         });

//         instance.addEventListener("comments.delete", deletedComments => {
//           const commentList = deletedComments.get(0);
//           if (commentList && commentList.forEach) {
//             commentList.forEach(comment => comment.getMentionedUserIds());
//           }
//         });

//       } catch (error) {
//         console.error("Error loading PSPDFKit:", error);
//       }
//     };

//     loadPSPDFKit();

//     return () => {
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
import React, { useEffect, useRef } from "react";
import PSPDFKit from "pspdfkit";
// import { toolbarCustomBreakpoint } from "../../_server/components/example/utils";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
  const isLoadingNotes = useRef(false);
  const documentID = "YOUR_DOCUMENT_ID"; // Replace YOUR_DOCUMENT_ID with the actual document ID

  // Function to create a note object
  const createPdfNote = (noteJson) => {
    return new Promise((resolve, reject) => {
      // Simulate API call or async operation
      setTimeout(() => {
        console.log("Note created:",(noteJson));
        resolve({
          "bbox": [
            noteJson.createdNote[5].left,
            noteJson.createdNote[5].top,
            noteJson.createdNote[5].width            ,
            noteJson.createdNote[5].height
          ],
          "blendMode":"multiply",
          "createdAt": noteJson.createdComments.createdAt          ,
          "id":  noteJson.createdNote[0],
          "name":  noteJson.createdNote[1],
          "opacity":  noteJson.createdNote[4],
          "pageIndex": noteJson.createdComments.pageIndex,
          "strokeColor": "#2293FB",
          // "strokeWidth": 5,
          // "type": "pspdfkit/shape/rectangle",
          // "updatedAt": "2024-04-26T06:12:56.653Z",
          // "v": 1,
          // "note": "<p>gggggggg</p>",
          // "creatorName": "Raj",
          // "createdComments": {
          //   "id": "01HWCGJ2AV276JTHE91745Z4K9",
          //   "rootId": "01HWCGJ2AP3MXSS46NPJ636C97",
          //   "pageIndex": 2,
          //   "pdfObjectId": null,
          //   "creatorName": "Raj",
          //   "createdAt": "2024-04-26T06:12:56.653Z",
          //   "updatedAt": "2024-04-26T06:12:56.653Z",
          //   "text": {
          //     "format": "xhtml",
          //     "value": "<p>gggggggg</p>"
          //   },
          //   "customData": null
          // },
          // "createdNote": [
          //   "01HWCGJ2AP3MXSS46NPJ636C97",
          //   "01HWCGJ2AP3MXSS46NPJ636C97",
          //   null,
          //   null,
          //   2,
          //   {
          //     "left": 120.28019409179689,
          //     "top": 246.2462158203125,
          //     "width": 71.87578124999999,
          //     "height": 21.29609375000001
          //   },
          //   null,
          //   null,
          //   null,
          //   "Raj",
          //   "2024-04-26T06:12:53.719Z",
          //   "2024-04-26T06:12:53.719Z",
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   null,
          //   true
          // ]
        }); // Simulated response with an ID
      }, 1000);
    });
  };
  // Define toSerializableObject function here as well
  function toSerializableObject(obj) {
    return { ...obj }; // Just returning a shallow copy of the object for demonstration
  }
  let annotedata=[   
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
  {
    "bbox": [
      120.28019409179689,
      246.2462158203125,
      191.15697534179688,
      267.5423095703125
    ],
    "blendMode":"multiply",
    "createdAt": "2024-04-26T06:12:53.719Z",
    "id": "01HWCGJ2AV276JTHE91745Z4K9",
    "name": "01HWCGJ2AV276JTHE91745Z4K9",
    "opacity": 1,
    "pageIndex": 2,
    "strokeColor": "#2293FB",
    "strokeWidth": 5,
    "type": "pspdfkit/shape/rectangle",
    "updatedAt": "2024-04-26T06:12:56.653Z",
    "v": 1,
    "note": "<p>gggggggg</p>",
    "creatorName": "Raj",
    "createdComments": {
      "id": "01HWCGJ2AV276JTHE91745Z4K9",
      "rootId": "01HWCGJ2AP3MXSS46NPJ636C97",
      "pageIndex": 2,
      "pdfObjectId": null,
      "creatorName": "Raj",
      "createdAt": "2024-04-26T06:12:56.653Z",
      "updatedAt": "2024-04-26T06:12:56.653Z",
      "text": {
        "format": "xhtml",
        "value": "<p>gggggggg</p>"
      },
      "customData": null
    },
    "createdNote": [
      "01HWCGJ2AP3MXSS46NPJ636C97",
      "01HWCGJ2AP3MXSS46NPJ636C97",
      null,
      null,
      2,
      {
        "left": 120.28019409179689,
        "top": 246.2462158203125,
        "width": 71.87578124999999,
        "height": 21.29609375000001
      },
      null,
      null,
      null,
      "Raj",
      "2024-04-26T06:12:53.719Z",
      "2024-04-26T06:12:53.719Z",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      true
    ]
  }]

  useEffect(() => {
    const loadPSPDFKit = async () => {
      try {
        const container = containerRef.current;
        let adminName = localStorage.getItem("admin");

        if (!container) {
          throw new Error("Container element not found.");
        }

        const instance = await PSPDFKit.load({
          container,
          license: "YOUR_PSPDFKIT_LICENSE_KEY",
          document: props.document,
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
          CommentMarkerAnnotation: true,
          setOnCommentCreationStart: true,
          toolbarItems: PSPDFKit.defaultToolbarItems.concat({ type: "comment" }),
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
          console.log("Data from comments.create:", createdComments.get(0));
        });
  
        /* Function to create Annotation note */
        instance.addEventListener("annotations.create", async createdNote => {
          const note = createdNote.get(0);  
          const serializedObjectNote = toSerializableObject(note);
          console.log(serializedObjectNote)
          const noteJson = serializedObjectNote;
          if (!isLoadingNotes.current) {
            // Store data from annotations.create in eventData
            eventData.createdNote = noteJson._values._root.array[0].array;
            console.log("Combined eventData:", (eventData));
            createPdfNote(eventData).then(response => {
              console.log("Note created with ID:", response, "Data from annotations.create:", noteJson);
  
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
              [{
                "bbox": [
                  120.28019409179689,
                  246.2462158203125,
                  191.15697534179688,
                  267.5423095703125
                ],
                "blendMode":"multiply",
                "createdAt": "2024-04-26T06:12:53.719Z",
                "id": "01HWCGJ2AV276JTHE91745Z4K9",
                "name": "01HWCGJ2AV276JTHE91745Z4K9",
                "opacity": 1,
                "pageIndex": 2,
                "strokeColor": "#2293FB",
                "strokeWidth": 5,
                "type": "pspdfkit/shape/rectangle",
                "updatedAt": "2024-04-26T06:12:56.653Z",
                "v": 1,
                "note": "<p>gggggggg</p>",
                "creatorName": "Raj",
                "createdComments": {
                  "id": "01HWCGJ2AV276JTHE91745Z4K9",
                  "rootId": "01HWCGJ2AP3MXSS46NPJ636C97",
                  "pageIndex": 2,
                  "pdfObjectId": null,
                  "creatorName": "Raj",
                  "createdAt": "2024-04-26T06:12:56.653Z",
                  "updatedAt": "2024-04-26T06:12:56.653Z",
                  "text": {
                    "format": "xhtml",
                    "value": "<p>gggggggg</p>"
                  },
                  "customData": null
                },
                "createdNote": [
                  "01HWCGJ2AP3MXSS46NPJ636C97",
                  "01HWCGJ2AP3MXSS46NPJ636C97",
                  null,
                  null,
                  2,
                  {
                    "left": 120.28019409179689,
                    "top": 246.2462158203125,
                    "width": 71.87578124999999,
                    "height": 21.29609375000001
                  },
                  null,
                  null,
                  null,
                  "Raj",
                  "2024-04-26T06:12:53.719Z",
                  "2024-04-26T06:12:53.719Z",
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  true
                ]}
              ]
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
      const container = containerRef.current;
      if (container && window.PSPDFKit) {
        window.PSPDFKit.unload(container);
      }
    };
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
