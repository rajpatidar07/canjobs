import { toast } from "react-toastify";
import { ADocAnnotation, UpdateDocuentcommentAssign } from "../../../api/api";
const profile = {
  userProfile: {
    name:
      // localStorage.getItem("userType") === "user"
      //     ? localStorage.getItem("name").charAt(0).toUpperCase() + localStorage.getItem("name").slice(1) :
      localStorage.getItem("admin")
        ? localStorage.getItem("admin").charAt(0).toUpperCase() +
          localStorage.getItem("admin").slice(1)
        : "",
    firstName:
      //  localStorage.getItem("userType") === "user"
      //     ? localStorage.getItem("name") :
      localStorage.getItem("admin"),
    email:
      //  localStorage.getItem("userType") === "user"
      //     ? localStorage.getItem("email") :
      localStorage.getItem("admin_email"),
    id:
      // localStorage.getItem("userType") === "user"
      //     ? localStorage.getItem("employee_id") :
      localStorage.getItem("admin_id"),
    type: "Person",
  },
};
let client_id = "d9e8b7bcb61b42b6a387bfa9cf16a75b"//(Local)
//"713b22cf34e345c388e4490f9c9dc79b"//Canpathways
//"d9e8b7bcb61b42b6a387bfa9cf16a75b"//(Local)
//"d9b36f468d7a4e4e8b275f13728f1132"//(vercel)
class ViewSDKClient {
  constructor() {
    this.readyPromise = new Promise((resolve) => {
      if (window.AdobeDC) {
        resolve();
      } else {
        document.addEventListener("adobe_dc_view_sdk.ready", () => {
          resolve();
        });
      }
    });
    this.adobeDCView = undefined;
    this.annots = [];
  }

  // ready() {
  //     return this.readyPromise;
  // }
  ready() {
    return this.readyPromise.then(() => {
      this.registerGetUserProfileApiHandler();
    });
  }

  previewFile(divId, viewerConfig, url, data) {
    const fileExtension = data.name.split(".").pop().toLowerCase();
    const config = {
      clientId: client_id,
    };

    if (divId) {
      config.divId = divId;
    }

    this.adobeDCView = new window.AdobeDC.View(config);

    // Set viewer configuration with all options enabled for all file types
    viewerConfig = {
      ...viewerConfig,
      embedMode: window.AdobeDC.View.Enum.EmbedMode.INLINE, // Display inline
      showAnnotationTools:
        localStorage.getItem("userType") === "admin"|| localStorage.getItem("userType") === "agent"  ? true : false, // Show annotation tools
      showDownloadPDF: true, // Show download PDF option
      showPrintPDF: true, // Show print PDF option
      enableFormFilling: true, // Enable form filling
      showLeftHandPanel: true, // Show left-hand panel
      showSearchPDF: true, // Show search PDF option
      showDocumentInfo: true, // Show document information
      enablePDFAnnotationEditing: false,
    };

    const previewFilePromise = this.adobeDCView.previewFile(
      {
        content: {
          location: {
            url: url,
            fileExtension: fileExtension,
            fileType: data.mimeType,
          },
        },
        metaData: {
          fileName: data.name,
          id: data.id,
          parentReference: data.parentReference,
        },
      },
      viewerConfig
    );

    return previewFilePromise;
  }

  previewFileUsingFilePromise(divId, filePromise, data) {
    this.adobeDCView = new window.AdobeDC.View({
      clientId: client_id,
      divId,
    });

    this.adobeDCView.previewFile(
      {
        content: {
          promise: filePromise,
        },
        metaData: {
          fileName: data.name,
        },
      },
      {}
    );
  }

  registerSaveApiHandler(userId, annotationId,DocUserType) {
    const saveApiHandler = (metaData, content, options) => {
      const selectedMentionAdmin = [];
      // Get the Assigned admin
      const container = document.getElementById("SelectAdmin");
      if (container && container.children) {
        for (let i = 0; i < container.children.length; i++) {
          const child = container.children[i];
          if (child.classList.contains("badgebadge")) {
            const childData = child
              .querySelector("span.d-none")
              .innerText.trim();
            const [email, id, type] = childData.split(" ");
            const name = child.innerText.trim();
            selectedMentionAdmin.push({ name, email, id, type });
          }
        }
      } else {
        console.error("Container element not found or has no children.");
      }
      return new Promise((resolve) => {
        setTimeout(async () => {
          const response = {
            code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
            data: {
              metaData: Object.assign(metaData, {
                updatedAt: new Date().getTime(),
              }),
              annotationData: this.annots,
            },
          };
          resolve(response);
          if (this.annots) {
            if (annotationId) {
              let updatedData = {
                // task_creator_user_id: localStorage.getItem("admin_id"),
                // task_creator_user_type: "",
                doc_id: metaData.id,
                // user_admin_assigned: "",
                json: this.annots,
                // assined_to_user_id: "",
                // assigned_user_type: "",
                // document_url: "",
                // subject_description: "N/A",
                // x_axis: "0",
                // y_axis: "0",
                // type: "document",
                // employee_id: metaData.userId,
                doc_parent_id: metaData.parentReference.id,
                id: annotationId,
                assigned_to: selectedMentionAdmin
                  .map((admin) => admin.email)
                  .join(","),
                assined_to_user_id: selectedMentionAdmin
                  .map((admin) => admin.id)
                  .join(","),
                assigned_to_name: selectedMentionAdmin
                  .map((admin) => admin.name)
                  .join(","),
                assigned_user_type_new: selectedMentionAdmin
                  .map((admin) => admin.type)
                  .join(","),
                task_creator_user_id: localStorage.getItem("admin_id"),
                task_creator_user_type: "admin",
              };
              try {
                let res = await UpdateDocuentcommentAssign(updatedData);
                if (res.message === "Task updated successfully!1") {
                  toast.success("Comment Data Updated Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                  });
                }
              } catch (err) {
                console.log(err);
              }
            } else {
              try {
                let res = await ADocAnnotation(
                  localStorage.getItem("admin_id"),
                  metaData.id,
                  selectedMentionAdmin.map((admin) => admin.id).join(","), //ASSIGNED ADMIN ID
                  selectedMentionAdmin.map((admin) => admin.email).join(","), //ASSIGNED ADMIN EMAIL
                  "", //SUBJECT
                  "N/A", //COMMENT
                  "0", //X AXIS
                  "0", //Y AXIS
                  "document",
                  localStorage.getItem("admin_type"), //sender ADMIN type
                  localStorage.getItem("admin"), //sender name,
                  selectedMentionAdmin.map((admin) => admin.name).join(","), //assigned Admin or user Name,
                  "", //follow up status(for notes only)
                  "", //Next follow up date(for notes only)
                  "admin", //Assign user type,
                  "", //Document url(for notes only)
                  localStorage.getItem("admin_email"), //Sender email
                  userId, //employee id,
                  "", //assigned_by_id
                  metaData.parentReference.id, // document parent code,
                  this.annots, //Annotation data,
                  annotationId ,//annotationId
                  DocUserType,//User type of document  
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
                }
              } catch (err) {
                console.log(err);
                // if (err.response.data.message === "required fields cannot be blank") {
                //     toast.error(" Please try again later.", {
                //         position: toast.POSITION.TOP_RIGHT,
                //         autoClose: 1000,
                //     });
                //     //   setSelectedAnnotation(null);
                //     //   setComments("");
                //     //   setSelectedAdmin("");
                //     //   setCommentApiCall(true);
                //     //   setAnnotationMode(!isAnnotationMode);
                //     //   setAddCommentFlag();
                //     //   setFilteredEmails([]);
                // }
              }
            }
          }
        }, 2000);
      });
    };
    this.adobeDCView.registerCallback(
      window.AdobeDC.View.Enum.CallbackType.SAVE_API,
      saveApiHandler,
      {}
    );
  }
  registerGetUserProfileApiHandler() {
    const getUserProfileApiHandler = () => {
      return new Promise((resolve, reject) => {
        resolve({
          code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
          data: profile,
        });
      });
    };

    if (this.adobeDCView) {
      this.adobeDCView.registerCallback(
        window.AdobeDC.View.Enum.CallbackType.GET_USER_PROFILE_API,
        getUserProfileApiHandler,
        {}
      );
    }
  }
  registerEventsHandler() {
    this.adobeDCView.registerCallback(
      window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
      (event) => {
        // console.log(event);
      },
      {
        enablePDFAnalytics: true,
      }
    );
  }
}

export default ViewSDKClient;
// options: {
//         enableAnnotationAPIs: true, // Enable annotation APIs for the viewer
//         includePDFAnnotations: true, // Include PDF annotations in the preview
//         showPageControls: true, // Show page navigation controls
//         showToolbar: true, // Show the viewer's toolbar
//         showReflowControl: true, // Show reflow control for text reflow
//         openThumbnailsPanel: true, // Open the thumbnails panel by default
//         enableFormNavigation: true, // Enable form navigation controls
//         enableAddTextComment: true, // Enable adding text comments
//         enableAddStickyNote: true, // Enable adding sticky notes
//         showDownloadButton: true, // Show the download button
//         showPrintButton: true, // Show the print button
//         showZoomButtons: true, // Show zoom in/out buttons
//         defaultViewMode: window.AdobeDC.View.Enum.ViewMode.FIT_WIDTH, // Set default view mode
//         showLeftHandPanel: true, // Show the left-hand panel
//         showRightHandPanel: true, // Show the right-hand panel
//         showSearchBar: true, // Show the search bar
//         enableFormFilling: true, // Enable form filling in the viewer
//         enableAutoSave: true, // Enable auto-save feature
//         showDocumentInfo: true, // Show document information
//         enablePDFAnalytics: true, // Enable PDF analytics
//         showAnnotationTools: true, // Show annotation tools
//         showSignaturePanel: true, // Show the signature panel
//         showThumbnailsPanel: true, // Show the thumbnails panel
//         showRotateButton: true, // Show the rotate button
//         showUndoRedoButtons: true, // Show undo/redo buttons
//         showFullScreenButton: true, // Show the full-screen button
//         enableAccessibility: true, // Enable accessibility features
//         showShareButton: true, // Show the share button
//         showOptimizedViewButton: true, // Show the optimized view button
//         showFormResetButton: true, // Show the form reset button
//         showFormSaveButton: true, // Show the form save button
//         enableMultiPageControl: true, // Enable multi-page control
//         enableBookmarkNavigation: true, // Enable bookmark navigation
//         showOpenFileButton: true, // Show the open file button
//         showAddAttachmentButton: true, // Show the add attachment button
//         enableHighlightText: true, // Enable text highlighting
//         enableStrikeoutText: true, // Enable text strikeout
//         enableUnderlineText: true, // Enable text underlining
//         enableAreaHighlight: true, // Enable area highlighting
//         enableLinkAnnotation: true, // Enable link annotations
//         enableTextSelection: true, // Enable text selection
//         enablePanZoom: true, // Enable pan and zoom
//         enableTextAnnotation: true, // Enable text annotation
//         enableRedactText: true, // Enable text redaction
//         enableMeasureTools: true, // Enable measure tools
//         enableCommentingTools: true, // Enable commenting tools
//         enableDigitalSignatureTools: true, // Enable digital signature tools
//         enableHandTool: true, // Enable hand tool for panning
//         enableZoomTools: true, // Enable zoom tools
//         enableRotatePages: true, // Enable page rotation
//         enableScrollZoom: true, // Enable scroll zoom
//         showAnnotationFilters: true, // Show annotation filters
//         enablePageViewTracking: true, // Enable page view tracking
//         enablePerformanceTracking: true, // Enable performance tracking
//         showTutorialButton: true, // Show the tutorial button
//         enableFormsTracking: true, // Enable forms tracking
//         enableTextExtraction: true, // Enable text extraction
//         enableDocumentStructureAnalysis: true, // Enable document structure analysis
//         enablePDFConversion: true, // Enable PDF conversion
//         enablePDFSigning: true, // Enable PDF signing
//         enablePDFEditing: true, // Enable PDF editing
//         enablePDFCreation: true, // Enable PDF creation
//         enablePDFAnnotationEditing: true, // Enable PDF annotation editing
//         enablePDFRedaction: true, // Enable PDF redaction
//         enablePDFTextEditing: true, // Enable PDF text editing
//         enablePDFImageEditing: true, // Enable PDF image editing
//         enablePDFPageManagement: true, // Enable PDF page management
//         enablePDFPasswordProtection: true, // Enable PDF password protection
//         enablePDFPermissionManagement: true, // Enable PDF permission management
//         enablePDFWatermarking: true, // Enable PDF watermarking
//         enablePDFStamping: true, // Enable PDF stamping
//         enablePDFSearch: true, // Enable PDF search
//         enablePDFCompression: true, // Enable PDF compression
//         enablePDFOptimization: true, // Enable PDF optimization
//         enablePDFAccessibility: true, // Enable PDF accessibility
//         enablePDFPageExtraction: true, // Enable PDF page extraction
//         enablePDFMerge: true, // Enable PDF merge
//         enablePDFSplit: true, // Enable PDF split
//         enablePDFPageRotation: true, // Enable PDF page rotation
//         enablePDFPageInsertion: true, // Enable PDF page insertion
//         enablePDFPageDeletion: true, // Enable PDF page deletion
//         enablePDFPageReordering: true, // Enable PDF page reordering
//         enablePDFPageScaling: true, // Enable PDF page scaling
//         enablePDFPageCropping: true, // Enable PDF page cropping
//         enablePDFTextSearch: true, // Enable PDF text search
//         enablePDFImageSearch: true, // Enable PDF image search
//         enablePDFAnnotationSearch: true, // Enable PDF annotation search
//         enablePDFCommentSearch: true, // Enable PDF comment search
//         enablePDFBookmarkSearch: true, // Enable PDF bookmark search
//         enablePDFContentRedaction: true, // Enable PDF content redaction
//         enablePDFDocumentComparison: true, // Enable PDF document comparison
//         enablePDFTextExtraction: true, // Enable PDF text extraction
//         enablePDFImageExtraction: true, // Enable PDF image extraction
//         enablePDFPageNumbering: true, // Enable PDF page numbering
//         enablePDFExport: true, // Enable PDF export
//         enablePDFImport: true, // Enable PDF import
//         enablePDFSigningWorkflow: true, // Enable PDF signing workflow
//         enablePDFAnnotationWorkflow: true, // Enable PDF annotation workflow
//         enablePDFReviewWorkflow: true, // Enable PDF review workflow
//         enablePDFApprovalWorkflow: true, // Enable PDF approval workflow
//         enablePDFSharingWorkflow: true, // Enable PDF sharing workflow
//         enablePDFPrintingWorkflow: true, // Enable PDF printing workflow
//         enablePDFEncryption: true, // Enable PDF encryption
//         enablePDFDecryption: true, // Enable PDF decryption
//         enablePDFDigitalSignature: true, // Enable PDF digital signature
//         enablePDFCertificateEncryption: true, // Enable PDF certificate encryption
//         enablePDFPasswordEncryption: true, // Enable PDF password encryption
//         enablePDFPublicKeyEncryption: true, // Enable PDF public key encryption
//         enablePDFPrivateKeyEncryption: true, // Enable PDF private key encryption
//         enablePDFPageNumberFormatting: true, // Enable PDF page number formatting
//         enablePDFAnnotationFormatting: true, // Enable PDF annotation formatting
//         enablePDFDocumentFormatting: true, // Enable PDF document formatting
//         enablePDFPageLayout: true, // Enable PDF page layout
//         enablePDFTextFormatting: true, // Enable PDF text formatting
//         enablePDFImageFormatting: true, // Enable PDF image formatting
//         enablePDFAnnotationVisibility: true, // Enable PDF annotation visibility
//         enablePDFAnnotationExport: true, // Enable PDF annotation export
//         enablePDFAnnotationImport: true, // Enable PDF annotation import
//         enablePDFAnnotationCreation: true, // Enable PDF annotation creation
//         enablePDFAnnotationModification: true, // Enable PDF annotation modification
//         enablePDFAnnotationDeletion: true, // Enable PDF annotation deletion
//         enablePDFAnnotationCollaboration: true, // Enable PDF annotation collaboration
//         enablePDFAnnotationReview: true, // Enable PDF annotation review
//         enablePDFAnnotationApproval: true, // Enable PDF annotation approval
//         enablePDFAnnotationSharing: true, // Enable PDF annotation sharing
//         enablePDFAnnotationPrinting: true, // Enable PDF annotation printing
//         enablePDFAnnotationRedaction: true, // Enable PDF annotation redaction
//         enablePDFAnnotationMarkup: true, // Enable PDF annotation markup
//         enablePDFAnnotationCommenting: true, // Enable PDF annotation commenting
//         enablePDFAnnotationStickyNotes: true, // Enable PDF annotation sticky notes
//         enablePDFAnnotationTextHighlighting: true, // Enable PDF annotation text highlighting
//         enablePDFAnnotationTextUnderlining: true, // Enable PDF annotation text underlining
//         enablePDFAnnotationTextStrikethrough: true, // Enable PDF annotation text strikethrough
//         enablePDFAnnotationTextInsertion: true, // Enable PDF annotation text insertion
//         enablePDFAnnotationTextReplacement: true, // Enable PDF annotation text replacement
//         enablePDFAnnotationTextRedaction: true, // Enable PDF annotation text redaction
//         enablePDFAnnotationAreaHighlighting: true, // Enable PDF annotation area highlighting
//         enablePDFAnnotationFreehandDrawing: true, // Enable PDF annotation freehand drawing
//         enablePDFAnnotationLineDrawing: true, // Enable PDF annotation line drawing
//         enablePDFAnnotationArrowDrawing: true, // Enable PDF annotation arrow drawing
//         enablePDFAnnotationRectangleDrawing: true, // Enable PDF annotation rectangle drawing
//         enablePDFAnnotationEllipseDrawing: true, // Enable PDF annotation ellipse drawing
//         enablePDFAnnotationPolygonDrawing: true, // Enable PDF annotation polygon drawing
//         enablePDFAnnotationPolylineDrawing: true, // Enable PDF annotation polyline drawing
//         enablePDFAnnotationMeasurementTools: true, // Enable PDF annotation measurement tools
//         enablePDFAnnotationCalibrationTools: true, // Enable PDF annotation calibration tools
//         enablePDFAnnotationTextCommenting: true, // Enable PDF annotation text commenting
//         enablePDFAnnotationVoiceCommenting: true, // Enable PDF annotation voice commenting
//         enablePDFAnnotationImageStamping: true, // Enable PDF annotation image stamping
//         enablePDFAnnotationSignatureStamping: true, // Enable PDF annotation signature stamping
//         enablePDFAnnotationFileAttachment: true, // Enable PDF annotation file attachment
//         enablePDFAnnotationTextAttachment: true, // Enable PDF annotation text attachment
//         enablePDFAnnotationHyperlink: true, // Enable PDF annotation hyperlink
//         enablePDFAnnotationPopup: true, // Enable PDF annotation popup
//         enablePDFAnnotationRedaction: true, // Enable PDF annotation redaction
//         enablePDFAnnotationRedactionOverlay: true, // Enable PDF annotation redaction overlay
//         enablePDFAnnotationRedactionTextReplacement: true, // Enable PDF annotation redaction text replacement
//         enablePDFAnnotationRedactionTextExtraction: true, // Enable PDF annotation redaction text extraction
//         enablePDFAnnotationRedactionFullTextRedaction: true, // Enable PDF annotation redaction full text redaction
//         enablePDFAnnotationReview: true, // Enable PDF annotation review
//         enablePDFAnnotationReviewStamp: true, // Enable PDF annotation review stamp
//         enablePDFAnnotationReviewHighlight: true, // Enable PDF annotation review highlight
//         enablePDFAnnotationReviewStrikethrough: true, // Enable PDF annotation review strikethrough
//         enablePDFAnnotationReviewUnderline: true, // Enable PDF annotation review underline
//         enablePDFAnnotationReviewTextInsertion: true, // Enable PDF annotation review text insertion
//         enablePDFAnnotationReviewTextReplacement: true, // Enable PDF annotation review text replacement
//         enablePDFAnnotationReviewTextDeletion: true, // Enable PDF annotation review text deletion
//         enablePDFAnnotationReviewTextRedaction: true, // Enable PDF annotation review text redaction
//         enablePDFAnnotationReviewAreaHighlighting: true, // Enable PDF annotation review area highlighting
//         enablePDFAnnotationReviewFreehandDrawing: true, // Enable PDF annotation review freehand drawing
//         enablePDFAnnotationReviewLineDrawing: true, // Enable PDF annotation review line drawing
//         enablePDFAnnotationReviewArrowDrawing: true, // Enable PDF annotation review arrow drawing
//         enablePDFAnnotationReviewRectangleDrawing: true, // Enable PDF annotation review rectangle drawing
//         enablePDFAnnotationReviewEllipseDrawing: true, // Enable PDF annotation review ellipse drawing
//         enablePDFAnnotationReviewPolygonDrawing: true, // Enable PDF annotation review polygon drawing
//         enablePDFAnnotationReviewPolylineDrawing: true, // Enable PDF annotation review polyline drawing
//         enablePDFAnnotationReviewMeasurementTools: true, // Enable PDF annotation review measurement tools
//         enablePDFAnnotationReviewCalibrationTools: true, // Enable PDF annotation review calibration tools
//         enablePDFAnnotationReviewCommenting: true, // Enable PDF annotation review commenting
//         enablePDFAnnotationReviewVoiceCommenting: true, // Enable PDF annotation review voice commenting
//         enablePDFAnnotationReviewImageStamping: true, // Enable PDF annotation review image stamping
//         enablePDFAnnotationReviewSignatureStamping: true, // Enable PDF annotation review signature stamping
//         enablePDFAnnotationReviewFileAttachment: true, // Enable PDF annotation review file attachment
//         enablePDFAnnotationReviewTextAttachment: true, // Enable PDF annotation review text attachment
//         enablePDFAnnotationReviewHyperlink: true, // Enable PDF annotation review hyperlink
//         enablePDFAnnotationReviewPopup: true, // Enable PDF annotation review popup
//         enablePDFAnnotationReviewRedaction: true, // Enable PDF annotation review redaction
//         enablePDFAnnotationReviewRedactionOverlay: true, // Enable PDF annotation review redaction overlay
//         enablePDFAnnotationReviewRedactionTextReplacement: true, // Enable PDF annotation review redaction text replacement
//         enablePDFAnnotationReviewRedactionTextExtraction: true, // Enable PDF annotation review redaction text extraction
//         enablePDFAnnotationReviewRedactionFullTextRedaction: true, // Enable PDF annotation review redaction full text redaction
//         // Add more options as needed based on your requirements
//     },
