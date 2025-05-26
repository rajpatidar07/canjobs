// // eslint-disable-next-line import/no-anonymous-default-export
// export default function InitialFunction({initial}) {
//     return initial.length === 2
//       ? initial
//       : initial
//           .split(" ")
//           .filter((word) => word)
//           .map((word) => word[0])
//           .join(" ");
// }
import React from 'react';
import { Image, View, Text } from '@react-pdf/renderer';

export function InitialFunction({ felidData, isPdf }) {
  const signature = felidData?.initial;
  const isBase64Image = signature?.includes("data:image/png;base64");

  // PDF Version
  if (isPdf) {
    return signature ? (
      isBase64Image ? (
        <View
          style={{
            width: 100,
            height: 50,
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={signature}
            style={{
              display: "inline-block",
              maxWidth: "100%",
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
          {signature.split(" ")
            .filter((word) => word)
            .map((word) => word[0])
            .join(" ")}
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
    );
  }

  // HTML Version
  const signatureContent = isBase64Image
    ? `<img src="${signature}" alt="RCIC Signature" style="max-height: 100%;">`
    : `<span style="display: inline-block; max-width: 100%; max-height: 100%; text-transform: capitalize;font-family: Imperial Script, cursive;color:black;font-weight: bold;font-size:35px">
        &nbsp;&nbsp;&nbsp;
        ${signature.split(" ")
      .filter((word) => word)
      .map((word) => word[0])
      .join(" ") || ""}
        &nbsp;&nbsp;&nbsp;
      </span>`;

  const signatureBox = `
    <div class="border d-flex align-items-center justify-content-center" >
      ${signatureContent}
    </div>`;

  return signatureBox;
}

