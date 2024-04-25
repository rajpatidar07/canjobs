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
export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
  // const ownerId = "owner123"; // Set your desired owner ID
  // const ownerName = "John Doe"; // Set your desired owner name

  useEffect(() => {
    const loadPSPDFKit = async () => {
      try {
        const PSPDFKit = await import("pspdfkit");
        const container = containerRef.current;
        let adminName=localStorage.getItem("admin")
        const toolbarItems = PSPDFKit.defaultToolbarItems
          .concat({ type: 'comment' }) // Add comment tool.
          .filter((item) => item.type !== 'note'); // Remove note tool.

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
          toolbarItems,
          enableRichText: () => true
        });
        console.log(instance) 
      try{  instance.contentDocument.addEventListener(
          "pointerdown",
          event => {
            if (event.target && event.target.getAttribute("01HW2Y4NXRVR440HXAGB926H6G")) {
              event.preventDefault();
              event.stopImmediatePropagation();
              instance.setSelectedAnnotation(
                event.target.getAttribute("01HW2Y4NXRVR440HXAGB926H6G")
              );
            }
          },
          { capture: true }
        );}catch(err){
          console.log(err)
        }
        instance.setAnnotationCreatorName(adminName.charAt(0).toUpperCase() + adminName.slice(1));
        /*Function to create Annotation comment */     
         instance.addEventListener("comments.create", async createdComments => {
         console.log(createdComments.get(0).id)
        })
        /*Function to Update Annotation comment */     
        instance.addEventListener("comments.update", updatedComments => {
          console.log(updatedComments.get(0).id)
        });
         /*Function to Delete Annotation comment */
         instance.addEventListener("comments.delete", deletedComments => {
         console.log(deletedComments.get(0).id)
        });

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
  }, [props.document]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "calc(100vh - 100px)" }}
    />
  );
}
