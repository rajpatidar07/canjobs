// For React App (HTML) + PDF usage
import React from 'react';
import { Image, View, Text } from '@react-pdf/renderer';

export function ClientSignatureFunction({ felidData, familyJsonArray, page, isPdf = false }) {
  const signature = familyJsonArray[0]?.client_signature;
  const isBase64Image = signature?.includes("data:image/png;base64");
  const clientName = `${familyJsonArray[0]?.client_first_name || ''} ${familyJsonArray[0]?.client_last_name || ''}`;

  // PDF Version (using @react-pdf/renderer)
  if (isPdf) {
    return signature ? (
      isBase64Image ? (
         <View style={{
                  width: "100%",
                  height: 50,
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Image
                    src={signature}
                    style={{
                      display: "inline-block",
                      maxWidth: "50%",
                      maxHeight: "100%",
                    }}
                  />
                </View>
      ) : (
        <Text
          style={{
            display: "inline-block",
            maxWidth: "100%",
            maxHeight: "100%",
            textTransform: "capitalize",
            border: "1px solid #ccc",
            height: 50,
            padding: 10
          }}
        >
          {signature || ""}
        </Text>
      )
    ) : (
      <View
        style={{
          display: "inline-block",
          width: "100%",
          height: 50,
          border: "1px solid #ccc",
        }}
      />
    )
  }
  // HTML (React DOM) Version
  const signatureContent = isBase64Image
    ? `<img src="${signature}" alt="${clientName}" style="max-height: 50px;">`
    : `<span style="display: inline-block; max-width: 100%; max-height: 100%; text-transform: capitalize;font-family: Imperial Script, cursive;color:black;font-weight: bold;font-size:35px">
        &nbsp;&nbsp;&nbsp;
        ${signature === undefined || signature === "undefined" ? "" : signature}
        &nbsp;&nbsp;&nbsp
      </span>`;

  const signatureBox = `
    <div class="border d-flex align-items-center justify-content-center "style="height: 50px;" >
      ${signatureContent}
    </div>`;

  const needsAddButton = (felidData?.signature_status === "0" || felidData?.signature_status === 0);
  return needsAddButton && page === "user"
    ? signatureBox + `<button class="btn btn-outline-primary" id="add-signature-button-0">${signature ? "Edit" : "Add"} Signature</button>`
    : signatureBox;
}
