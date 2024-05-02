import React, { useEffect, useRef } from "react";
import PSPDFKit from "pspdfkit";
import { ADocAnnotation } from "../api/api";
// import { toolbarCustomBreakpoint } from "../../_server/components/example/utils";
import { toast } from "react-toastify";
export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
  const isLoadingNotes = useRef(false);
  // const documentID = "YOUR_DOCUMENT_ID"; // Replace YOUR_DOCUMENT_ID with the actual document ID
  // Function to create a note object
  const createPdfNote = (noteJson) => {
    return new Promise((resolve, reject) => {
      // Simulate API call or async operation
      if (noteJson) {
        setTimeout(() => {
          console.log("Note created:", (noteJson));
          resolve({
            "bbox": noteJson.createdNote.boundingBox,
            "blendMode": noteJson.createdNote.blendMode,
            "createdAt": noteJson.createdNote.createdAt,
            "name": noteJson.createdNote.name,
            "opacity": noteJson.createdNote.opacity,
            "pageIndex": noteJson.createdNote.pageIndex,
            // "strokeColor": "#2293FB",
            // "strokeWidth": 5,
            "type": "pspdfkit/comment",
            "rects": noteJson.createdNote.rects,
            "color": noteJson.createdNote.color,
            "updatedAt": noteJson.createdNote.updatedAt,
            "v": 1,
            canReply: true,
            // "note": "<p>gggggggg</p>",
            "creatorName": noteJson.createdNote.creatorName,
            "rootId": noteJson.createdComments.rootId,
            "pdfObjectId": noteJson.createdNote.pdfObjectId,
            // "text": {
            //   "format": noteJson.createdComments.text.format,
            //   "value": noteJson.createdComments.text.value
            // },
            "text": noteJson.createdComments.text.value,
            // "customData": null,
            "mentionId": noteJson.mentionId ? noteJson.mentionId : ""

          }); // Simulated response with an ID
        }, 1000);
      }
    });
  };
  // Define toSerializableObject function here as well
  // function toSerializableObject(obj) {
  //   return { ...obj }; // Just returning a shallow copy of the object for demonstration
  // }
  // let annotedata =props.commentsList
  // [
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
  // {
  //   "type": "pspdfkit/comment",
  //   "v": 1,
  //   "rootId": "01F46WTF5X3J1WEN6J2YXWHHEW",
  //   "pageIndex": 0,
  //   "pdfObjectId": null,
  //   "creatorName": null,
  //   "createdAt": "2021-04-26T10:50:30.650Z",
  //   "updatedAt": "2021-04-26T10:50:30.650Z",
  //   "text": "<p><span data-user-id=\"36\">Mayur</span> </p>",
  //   "customData": null
  // }]

  useEffect(() => {
    const loadPSPDFKit = async () => {
      let instance=null;
      try {
        const container = containerRef.current;
        let adminName = localStorage.getItem("admin");

        PSPDFKit.unload(container)
        if (!container) {
          throw new Error("Container element not found.");
        }
        const toolbarItems = PSPDFKit.defaultToolbarItems
          .concat({ type: 'comment' }) // Add comment tool.
          .filter((item) => item.type !== 'note'); // Remove note tool.
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
         instance = await PSPDFKit.load({
          container,
          license: "zFV8P9YHvxGpBc0Tp-W4cg6Fl-zD9VyTWQGiJTi1A0pM18iMZUQDrARKsunUn4oFAuan32RJzCDR--1nglDFAeacyOumrQOdc7aLnh0zkUHLoL9ZIyYS885cFaZySBalYNU4cbnmdUaZUlte0UEfoF8wM-_lJnbFYTYyWvpuPQ7BICRjm9_SGVz9V8bQGEU3OjpqY_YsvjfyRw", // Replace with your actual license key
          document: props.document,
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
          CommentMarkerAnnotation: true,
          setOnCommentCreationStart: true,
          toolbarItems:
          PSPDFKit.defaultToolbarItems.concat({ type: "annotate" }),
          mentionableUsers: props.adminDetailsFOrMention,
          autoSaveMode: PSPDFKit.AutoSaveMode.IMMEDIATE,
          enableRichText: () => true,
          instant:true
        });
        
        instance.setAnnotationCreatorName(adminName.charAt(0).toUpperCase() + adminName.slice(1));
        let eventData = {};
        /* Function to create Annotation comment */
        instance.addEventListener("comments.create", async createdComments => {
          eventData.createdComments = createdComments.get(0);
          console.log(createdComments.get(0))
          eventData.mentionId = createdComments.get(0).getMentionedUserIds()._map._root ? createdComments.get(0).getMentionedUserIds()._map._root.entries[0][0] : ""
          // console.log("Data from comments.create:", createdComments.get(0).getMentionedUserIds()._map._root.entries[0][0]);
        });

        /* Function to create Annotation note */
        instance.addEventListener("annotations.create", async createdNote => {
          const note = createdNote.get(0);
          console.log(note)
          // const serializedObjectNote = toSerializableObject(note);
          // const noteJson = serializedObjectNote;
          if (!isLoadingNotes.current) {
            // Store data from annotations.create in eventData
            eventData.createdNote = note;
            // console.log("Combined eventData:", (eventData));
            createPdfNote(eventData).then(async response => {
              console.log("Final data:", JSON.stringify(response));
              try {
                let res = await ADocAnnotation(
                  localStorage.getItem("admin_id"),
                  props.data.id,
                  "",//ASSIGNED ADMIN ID
                  "",//ASSIGNED ADMIN EMAIL
                  "",//SUBJECT
                  "N/A",//COMMENT
                  "0",//X AXIS
                  "0",//Y AXIS
                  "document",
                  localStorage.getItem("admin_type"), //sender ADMIN type
                  localStorage.getItem("admin"), //sender name,
                  "", //assigned Admin or user Name,
                  "", //follow up status(for notes only)
                  "", //Next follow up date(for notes only)
                  "", //Assign user type,
                  "", //Document url(for notes only)
                  localStorage.getItem("admin_email"), //Sender email
                  props.userId, //employee id,
                  "", //assigned_by_id
                  props.data.parentReference.id, // document parent code,
                  response,//Annotation data,
                  //metaData.annotationId //annotationId
                );
                if (res.data.message === "task inserted successfully!") {
                  toast.success("Commented Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                  });
                  //   setSelectedAnnotation(null);
                  //   setComments("");
                  //   setCommentApiCall(true);
                  //   setSelectedAdmin("");
                  //   setAnnotationMode(!isAnnotationMode);
                  //   setFilteredEmails([]);
                  // setNotificationApiCall(true);
                  localStorage.setItem("callNotification", true);
                  instance.save();
                }
              } catch (err) {
                console.log(err);
                if (err.response.data.message === "required fields cannot be blank") {
                  toast.error(" Please try again later.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                  });
                  //   setSelectedAnnotation(null);
                  //   setComments("");
                  //   setSelectedAdmin("");
                  //   setCommentApiCall(true);
                  //   setAnnotationMode(!isAnnotationMode);
                  //   setAddCommentFlag();
                  //   setFilteredEmails([]);
                }
              }
            });
          }
        });
        /* Function to Update Annotation comment */
        instance.addEventListener("comments.update", updatedComments => {
          // console.log(updatedComments.get(0).id);
        });

        /* Function to Delete Annotation comment */
        instance.addEventListener("comments.delete", deletedComments => {
          // console.log(deletedComments.get(0).id);
        });

        instance.setMentionableUsers(props.adminDetailsFOrMention)

        // Your existing code for PSPDFKit configuration and event listeners
        instance.addEventListener("annotations.load", (loadedAnnotations) => {
          // console.log("Annotations were loaded", loadedAnnotations.toJS());
        });
        instance.addEventListener("annotations.change", function () {
          // console.log("Something in the annotations has changed.");
        });
        console.log(props.commentsList)
        /*Json tried to show */
        // instance.applyOperations([
        //   {
        //     type: "applyInstantJson",
        //     instantJson: {
        //       annotations:
        //       [
        //         {
        //             "bbox": {
        //                 "left": 106,
        //                 "top": 159.2779541015625,
        //                 "width": 146.3759979248047,
        //                 "height": 54.37175292968749
        //             },
        //             "blendMode": "multiply",
        //             "createdAt": "2024-05-01T04:57:40.165Z",
        //             "name": "01HWS87XJ2VXZ96CXMVDVXSNFE",
        //             "opacity": 1,
        //             "pageIndex": 0,
        //             "type": "pspdfkit/comment",
        //             "rects": [
        //                 {
        //                     "left": 154.7861541748047,
        //                     "top": 159.2779541015625,
        //                     "width": 97.58984375,
        //                     "height": 32.76015625
        //                 },
        //                 {
        //                     "left": 106,
        //                     "top": 197.27001953125,
        //                     "width": 122.43203125000001,
        //                     "height": 16.3796875
        //                 }
        //             ],
        //             "color": {
        //                 "r": 252,
        //                 "g": 238,
        //                 "b": 124,
        //                 "transparent": false
        //             },
        //             "updatedAt": "2024-05-01T04:57:40.165Z",
        //             "v": 1,
        //             "canReply": true,
        //             "creatorName": "Raj",
        //             "rootId": "01HWS87XJ2VXZ96CXMVDVXSNFE",
        //             "pdfObjectId": null,
        //             "text": "wdadasdasd Aashi vyas ",
        //             "mentionId": "46"
        //         },
        //         {
        //             "bbox": {
        //                 "left": 106.55204772949219,
        //                 "top": 449.2699890136719,
        //                 "width": 377.37591552734375,
        //                 "height": 52.37968749999999
        //             },
        //             "blendMode": "multiply",
        //             "createdAt": "2024-04-30T12:55:49.344Z",
        //             "name": "01HWQH6QAZQMY2RHKPZM3N0320",
        //             "opacity": 1,
        //             "pageIndex": 0,
        //             "type": "pspdfkit/comment",
        //             "rects": [
        //                 {
        //                     "left": 145.04612731933594,
        //                     "top": 449.2699890136719,
        //                     "width": 284.64140625,
        //                     "height": 16.3796875
        //                 },
        //                 {
        //                     "left": 106.55204772949219,
        //                     "top": 467.2699890136719,
        //                     "width": 377.37591552734375,
        //                     "height": 16.3800048828125
        //                 },
        //                 {
        //                     "left": 106.7680435180664,
        //                     "top": 485.2699890136719,
        //                     "width": 116.69375000000001,
        //                     "height": 16.3796875
        //                 }
        //             ],
        //             "color": {
        //                 "r": 252,
        //                 "g": 238,
        //                 "b": 124,
        //                 "transparent": false
        //             },
        //             "updatedAt": "2024-04-30T12:55:49.344Z",
        //             "v": 1,
        //             "canReply": true,
        //             "creatorName": "Raj",
        //             "rootId": "01HWQH6QAZQMY2RHKPZM3N0320",
        //             "pdfObjectId": null,
        //             "text": "yyyyjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj Mayur ",
        //             "mentionId": "36"
        //         },
        //         {
        //             "bbox": {
        //                 "left": 107.96818542480469,
        //                 "top": 159.2779541015625,
        //                 "width": 144.4078125,
        //                 "height": 32.760156249999994
        //             },
        //             "blendMode": "multiply",
        //             "createdAt": "2024-04-30T12:55:13.444Z",
        //             "name": "01HWQH5M94H1ZKGYXHDNQH0NS6",
        //             "opacity": 1,
        //             "pageIndex": 0,
        //             "type": "pspdfkit/comment",
        //             "rects": [
        //                 {
        //                     "left": 107.96818542480469,
        //                     "top": 159.2779541015625,
        //                     "width": 144.4078125,
        //                     "height": 32.76015625
        //                 }
        //             ],
        //             "color": {
        //                 "r": 252,
        //                 "g": 238,
        //                 "b": 124,
        //                 "transparent": false
        //             },
        //             "updatedAt": "2024-04-30T12:55:13.444Z",
        //             "v": 1,
        //             "canReply": true,
        //             "creatorName": "Raj",
        //             "rootId": "01HWQH5M94H1ZKGYXHDNQH0NS6",
        //             "pdfObjectId": null,
        //             "text": "gfffffffffffffffffffgfgfgfgfgfgfgfgfgfgffgfgfgfffgfgfgf Aashi vyas ",
        //             "mentionId": "46",
        //             "replies": [  {
        //               "creatorName": "Jane Smith",
        //               "createdAt": "2024-05-01T11:00:00.000Z",
        //               "text": "This replies to the original comment."
        //             },
        //             {
        //               "creatorName": "John Doe",
        //               "createdAt": "2024-05-01T11:30:00.000Z",
        //               "text": "Adding another reply to the conversation."
        //             }
        //           ]
        //         }
        //     ]
        //         // [
        //         //   //   {
        //         //   //   "type": "pspdfkit/comment-marker",
        //         //   //   "v": 1,
        //         //   //   "pageIndex": 2,
        //         //   //   "creatorName": "John Doe",
        //         //   //   "createdAt": "2024-05-01T10:20:30.000Z",
        //         //   //   "rootId": "commentId123",  "replies": [  {
        //         //   //       "creatorName": "Jane Smith",
        //         //   //       "createdAt": "2024-05-01T11:00:00.000Z",
        //         //   //       "text": "This replies to the original comment."
        //         //   //     },
        //         //   //     {
        //         //   //       "creatorName": "John Doe",
        //         //   //       "createdAt": "2024-05-01T11:30:00.000Z",
        //         //   //       "text": "Adding another reply to the conversation."
        //         //   //     }
        //         //   //   ]
        //         //   // }
        //         //   {
        //         //     "bbox":[ 
        //         //         238.41796875,
        //         //         197.27001953125,
        //         //         38.59687500000001,
        //         //         16.37968749999999
        //         //   ],
        //         //     "blendMode": "multiply",
        //         //     "createdAt": "2024-04-30T09:02:15.972Z",
        //         //     "name": "01HWQ3V2D47F614ZPCW89Q1PVG",
        //         //     "opacity": 1,
        //         //     "pageIndex": 0,
        //         //     "type": "pspdfkit/comment-marker",
        //         //       "rects": [
                        
        //         //             238.41796875,
        //         //              197.27001953125,
        //         //              38.596875000000004,
        //         //              16.3796875
                        
        //         //     ],
        //         //     // "color": {
        //         //     //     "r": 252,
        //         //     //     "g": 238,
        //         //     //     "b": 124,
        //         //     //     "transparent": false
        //         //     // },
        //         //     "updatedAt": "2024-04-30T09:02:15.972Z",
        //         //     "v": 1,
        //         //     "creatorName": "Raj",
        //         //     "rootId": "01HWQ3V2D47F614ZPCW89Q1PVG",
        //         //     "pdfObjectId": null,
        //         //     "text": "<p>ghytrfvb</p>",
        //         //     "customData": null,
        //         //     "mentionId": ""
        //         //   }
        //         // ]
        //       // props.commentsList
        //       //  [
        //       //   {
        //       //     bbox: [176.91427917480468, 159.2779541015625, 49.424218749999994, 32.760156249999994],
        //       //     blendMode: "multiply",
        //       //     createdAt: "2024-04-30T09:04:23.944Z",
        //       //     id: "01HWQ3YZC84S0BZJJ946AQH3DB",
        //       //     name: "01HWQ3YZC84S0BZJJ946AQH3DB",
        //       //     opacity: 1,
        //       //     pageIndex: 0,
        //       //     type: "pspdfkit/comment",
        //       //     rects: [
        //       //       {
        //       //         left: 176.91427917480468,
        //       //         top: 159.2779541015625,
        //       //         width: 49.42421875,
        //       //         height: 32.76015625
        //       //       }
        //       //     ],
        //       //     color: { r: 252, g: 238, b: 124, transparent: false },
        //       //     updatedAt: "2024-04-30T09:04:23.944Z",
        //       //     v: 1,
        //       //     creatorName: "Raj",
        //       //     rootId: "01HWQ3YZC84S0BZJJ946AQH3DB",
        //       //     pdfObjectId: null,
        //       //     text: "<p>kkkkkk</p>",
        //       //     customData: null,
        //       //     "commentText": "This is a great comment!",
        //       //     "mentionedUsers": ["user1", "user2"],
        //       //     canReply: true
        //       //   }
        //       // ],
        //       , format: "https://pspdfkit.com/instant-json/v1"
        //     }
        //   }
        // ])
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
        instance.addEventListener("annotations.didSave", (annotations) => {
          console.log("Annotations saved!", annotations.toJS());})
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
  }, [props.document, props.commentsList]);

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
