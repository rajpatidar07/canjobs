// SignaturePadComponent.js
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePadComponent = ({ onSignature, navigate }) => {
    const sigPad = useRef(null);

    const clear = () => {
        sigPad.current.clear();
    };

    const save = () => {
        const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
        // console.log('Signature data URL:', dataUrl); // Debug log
        if (sigPad.current) {
            onSignature(dataUrl);
            navigate("/agreeone", { state: { dataUrl } })
        }
    };
    return (
        <div>
            <SignatureCanvas
                ref={sigPad}
                penColor="black"
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
            />
            <button onClick={clear}>Clear</button>
            <button onClick={save}>Save</button>
        </div>
    );
};

export default SignaturePadComponent;
