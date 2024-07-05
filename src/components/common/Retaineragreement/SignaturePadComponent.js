// SignaturePadComponent.js
import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePadComponent = ({ setState, state, label, name }) => {
    const sigPad = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    // let navigate = useNavigate();

    // const clear = () => {
    //     sigPad.current.clear();
    //     setState({ ...state, [name]: "" });
    // };

    // const save = async () => {
    //     const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    //     if (sigPad.current) {
    //         navigate("/agreeone", { state: { dataUrl, user_id, emp_user_type, folderID } });
    //     }
    // };
    /*FUnction to set the image to state and preview it */
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    sigPad.current.clear();
                    const ctx = sigPad.current.getCanvas().getContext("2d");
                    ctx.drawImage(img, 0, 0, sigPad.current.getCanvas().width, sigPad.current.getCanvas().height);
                    const signature = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
                    setState({ ...state, [name]: signature });
                    setSelectedImage(signature)
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        const saveSignature = () => {
            if (sigPad.current) {
                const signature = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
                // console.log(signature);          
                setState({ ...state, [name]: signature });
            }
        };

        const canvas = sigPad.current.getCanvas();
        canvas.addEventListener('mouseup', saveSignature);
        canvas.addEventListener('touchend', saveSignature);

        return () => {
            canvas.removeEventListener('mouseup', saveSignature);
            canvas.removeEventListener('touchend', saveSignature);
        };
    }, [setState, state, name]);
    return (

        // <div className="form-group">
        //     <label className="font-size-4 text-black-2 line-height-reset">{label}</label>
        //     <div className='border border-dark '>
        //         <SignatureCanvas
        //             ref={sigPad}
        //             penColor="black"
        //             canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        //         />
        //     </div>
        //     <input type="file" accept="image/*" onChange={handleImageUpload} />
        //     <button onClick={()=>clear()} type='button' className="btn btn-secondary btn-sm">Clear</button>
        // </div>
        <div className={`d-flex align-items-center justify-content-center ${selectedImage ? "row" : ""}`}>
            <div className='border border-dark d-none'>
                <SignatureCanvas
                    ref={sigPad}
                    penColor="black"
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                />
            </div>
            {selectedImage && <div className='col'>
                <div style={{
                    // width: "200px",
                    // height: "200px",
                    // objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "5px",
                }}>
                    <img src={selectedImage} alt="Selected" style={{
                        width: "200px",
                        height: "200px",
                    }} />
                </div>
            </div>}
            <div className={selectedImage ? "col" : ""}>
                <label
                    className="btn btn-white rounded"
                    style={{
                        position: "relative",
                        margin: 10,
                        color: "grey",
                        minHeight: 50,
                        fontSize: 40,
                        flexDirection: "row",
                        lineHeight: 1,
                        left: "auto"
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            handleImageUpload(e);
                        }}
                        multiple
                    />
                    +
                    <p className="m-0" style={{ fontWeight: 400, fontSize: 12 }}>
                        Add Sign
                    </p>
                </label>
            </div>
        </div>
    );
};

export default SignaturePadComponent;
