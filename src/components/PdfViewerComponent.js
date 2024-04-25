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
        console.log("Note created:", noteJson);
        resolve({ id: "generated_id_for_note" }); // Simulated response with an ID
      }, 1000);
    });
  };
// Ink annotation with three lines on the second page
// function newInkAnnotation() {
//   return new PSPDFKit.Annotations.InkAnnotation({
//     pageIndex: 1,
//     boundingBox: new PSPDFKit.Geometry.Rect({
//       width: 150,
//       height: 50,
//       top: 50,
//       left: 50,
//     }),
//     strokeColor: PSPDFKit.Color.WHITE,
//     lines: PSPDFKit.Immutable.List([
//       PSPDFKit.Immutable.List([
//         new PSPDFKit.Geometry.DrawingPoint({ x: 50, y: 50 }),
//         new PSPDFKit.Geometry.DrawingPoint({ x: 200, y: 50 }),
//       ]),
//       PSPDFKit.Immutable.List([
//         new PSPDFKit.Geometry.DrawingPoint({ x: 50, y: 75 }),
//         new PSPDFKit.Geometry.DrawingPoint({ x: 200, y: 75 }),
//       ]),
//       PSPDFKit.Immutable.List([
//         new PSPDFKit.Geometry.DrawingPoint({ x: 50, y: 100 }),
//         new PSPDFKit.Geometry.DrawingPoint({ x: 200, y: 100 }),
//       ]),
//     ]),
//   });
// }

// // Creates a text annotation on the first page that says "Welcome to PSPDFKit"
// function newTextAnnotation() {
//   return new PSPDFKit.Annotations.TextAnnotation({
//     pageIndex: 0,
//     boundingBox: new PSPDFKit.Geometry.Rect({
//       width: 150,
//       height: 150,
//       top: 50,
//       left: 50,
//     }),
//     "text": "Welcome to\nPSPDFKit",
//     font: "Helvetica",
//     isBold: true,
//     horizontalAlign: "center",
//     verticalAlign: "center",
//     backgroundColor: PSPDFKit.Color.BLUE,
//     fontColor: PSPDFKit.Color.WHITE,
//   });
// }

// // Creates an ellipse annotation on the first page
// function newEllipseAnnotationAnnotation() {
//   return new PSPDFKit.Annotations.EllipseAnnotation({
//     pageIndex: 0,
//     boundingBox: new PSPDFKit.Geometry.Rect({
//       left: 390,
//       top: 380,
//       width: 120,
//       height: 120,
//     }),
//   });
// }

// // Highlights the  "Set of Kitchen Utensils" on the first page
// function newHighlightAnnotation() {
//   return new PSPDFKit.Annotations.HighlightAnnotation({
//     pageIndex: 0,
//     boundingBox: new PSPDFKit.Geometry.Rect({
//       left: 30,
//       top: 424,
//       width: 223,
//       height: 83,
//     }),
//     rects: PSPDFKit.Immutable.List([
//       new PSPDFKit.Geometry.Rect({
//         left: 30,
//         top: 424,
//         width: 223,
//         height: 42,
//       }),
//       new PSPDFKit.Geometry.Rect({
//         left: 30,
//         top: 465,
//         width: 122,
//         height: 42,
//       }),
//     ]),
//   });
// }

// // Creates a Note annotation on the first page
// function newNoteAnnotation() {
//   return new PSPDFKit.Annotations.NoteAnnotation({
//     pageIndex: 0,
//     text: "An example for a Note Annotation",
//     boundingBox: new PSPDFKit.Geometry.Rect({
//       left: 500,
//       top: 20,
//       width: 30,
//       height: 30,
//     }),
//   });
// }
  // Define toSerializableObject function here as well
  function toSerializableObject(obj) {
    return { ...obj }; // Just returning a shallow copy of the object for demonstration
  }
  let annotedata=[     {
    bbox: [100, 150, 200, 75],
    blendMode: "normal",
    createdAt: "1970-01-01T00:00:00Z",
    id: "01F73GJ4RPENTCMFSCJ5CSFT5G",
    name: "01F73GJ4RPENTCMFSCJ5CSFT5G",
    opacity: 1,
    pageIndex: 0,
    strokeColor: "#2293FB",
    strokeWidth: 5,
    type: "pspdfkit/shape/rectangle",
    updatedAt: "1970-01-01T00:00:00Z",
    v: 1
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

        /* Function to create Annotation comment */
        instance.addEventListener("comments.create", async createdComments => {
          console.log(createdComments.get(0).id);
        });

        /* Function to create Annotation note */
        instance.addEventListener("annotations.create", async createdNote => {
          const note = createdNote.get(0);
          const serializedObjectNote = toSerializableObject(note);
          const noteJson = serializedObjectNote
          if (!isLoadingNotes.current) {
            createPdfNote(noteJson).then(response => {
              console.log("Note created with ID:", response.id);
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
        // instance.applyOperations([
        //   {
        //     type: "applyInstantJson",
        //     instantJson: {
        //       annotations: 
        //         annotedata
        //       ,
        //       format: "https://pspdfkit.com/instant-json/v1"
        //     }
        //   }
        // ]);
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
