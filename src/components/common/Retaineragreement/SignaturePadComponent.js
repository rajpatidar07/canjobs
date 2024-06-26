// SignaturePadComponent.js
import React, { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePadComponent = ({ user_id, emp_user_type, folderID ,label}) => {
    const sigPad = useRef(null);
    // let navigate = useNavigate();

    const clear = () => {
        sigPad.current.clear();
    };

    // const save = async () => {
    //     const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    //     if (sigPad.current) {
    //         navigate("/agreeone", { state: { dataUrl, user_id, emp_user_type, folderID } });
    //     }
    // };

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
            console.log(sigPad.current.getTrimmedCanvas().toDataURL('image/png'))
        }
    };

    return (
        
        <div className="form-group">
      <label className="font-size-4 text-black-2 line-height-reset">{label}</label>
            <div className='border border-dark '>
                <SignatureCanvas
                    ref={sigPad}
                    penColor="black"
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                />
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={clear} className="btn btn-secondary btn-sm">Clear</button>
        </div>
    );
};

export default SignaturePadComponent;
