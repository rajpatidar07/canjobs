// SignaturePadComponent.js
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePadComponent = () => {
    const sigPad = useRef(null);
    let navigate = useNavigate();

    const clear = () => {
        sigPad.current.clear();
    };

    const save = () => {
        const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
        // console.log('Signature data URL:', dataUrl); // Debug log
        if (sigPad.current) {
            localStorage.setItem("signature", dataUrl);
            navigate("/agreeone", { state: { dataUrl } });
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const ctx = sigPad.current.getCanvas().getContext("2d");
                    ctx.drawImage(img, 0, 0, sigPad.current.getCanvas().width, sigPad.current.getCanvas().height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className='border border-dark '>
                <SignatureCanvas
                    ref={sigPad}
                    penColor="black"
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                />
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={clear}>Clear</button>
            <button onClick={save}>Save</button>
        </div>
    );
};

export default SignaturePadComponent;
