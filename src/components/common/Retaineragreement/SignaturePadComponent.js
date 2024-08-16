// SignaturePadComponent.js
import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePadComponent = ({ index, onSignature, setState, state, label, name }) => {
    const sigPad = useRef(null);
    // const [selectedImage, setSelectedImage] = useState(null);
    // let navigate = useNavigate();

    const clear = () => {
        sigPad.current.clear();
        setState({ ...state, [name]: "" });
    };

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
                    // setSelectedImage(signature)
                    if (onSignature) onSignature(signature, index); // Call the onSignature callback with the signature
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    // useEffect(() => {
    //     const saveSignature = () => {
    //         if (sigPad.current) {
    //             const signature = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    //             // console.log(signature);          
    //             setState({ ...state, [name]: signature });
    //         }
    //     };

    //     const canvas = sigPad.current.getCanvas();
    //     canvas.addEventListener('mouseup', saveSignature);
    //     canvas.addEventListener('touchend', saveSignature);

    //     return () => {
    //         canvas.removeEventListener('mouseup', saveSignature);
    //         canvas.removeEventListener('touchend', saveSignature);
    //     };
    // }, [setState, state, name]);
    useEffect(() => {
        // Load existing signature onto the canvas if it exists
        if (state && state[name]) {
            const img = new Image();
            img.onload = () => {
                sigPad.current.clear();
                const ctx = sigPad.current.getCanvas().getContext("2d");
                ctx.drawImage(img, 0, 0, sigPad.current.getCanvas().width, sigPad.current.getCanvas().height);
            };
            img.src = state[name];
        }

        const saveSignature = () => {
            if (sigPad.current) {
                const signature = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
                setState({ ...state, [name]: signature });
                if (onSignature) onSignature(signature, index); // Call the onSignature callback with the signature
            }
        };

        const canvas = sigPad.current.getCanvas();
        canvas.addEventListener('mouseup', saveSignature);
        canvas.addEventListener('touchend', saveSignature);

        return () => {
            canvas.removeEventListener('mouseup', saveSignature);
            canvas.removeEventListener('touchend', saveSignature);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setState, state, name, onSignature]);
    return (
        // <>
        //     <div className="form-group">
        //         <label className="font-size-4 text-black-2 line-height-reset">{label}</label>
        //         {/* <div className='border border-dark '>
        //             <SignatureCanvas
        //                 ref={sigPad}
        //                 penColor="black"
        //                 canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        //             />
        //         </div>
        //         <input type="file" accept="image/*" onChange={handleImageUpload} />
        //         <button onClick={() => clear()} type='button' className="btn btn-secondary btn-sm">Clear</button> */}

        //         <div className={`d-flex align-items-center justify-content-center ${selectedImage ? "row" : ""}`}>
        //             <div className='border border-dark '>
        //                 <SignatureCanvas
        //                     ref={sigPad}
        //                     penColor="black"
        //                     canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        //                 />
        //             </div>
        //             {selectedImage && <div className='col'>
        //                 <div style={{
        //                     // width: "200px",
        //                     // height: "200px",
        //                     // objectFit: "cover",
        //                     borderRadius: "10px",
        //                     marginBottom: "5px",
        //                 }}>
        //                     <img src={selectedImage} alt="Selected" style={{
        //                         width: "200px",
        //                         height: "200px",
        //                     }} />
        //                 </div>
        //             </div>}
        //             <div className={selectedImage ? "col" : ""}>
        //                 <label
        //                     className="btn btn-white rounded"
        //                     style={{
        //                         position: "relative",
        //                         margin: 10,
        //                         color: "grey",
        //                         minHeight: 50,
        //                         fontSize: 40,
        //                         flexDirection: "row",
        //                         lineHeight: 1,
        //                         left: "auto"
        //                     }}
        //                 >
        //                     <input
        //                         type="file"
        //                         accept="image/*"
        //                         style={{ display: "none" }}
        //                         onChange={(e) => {
        //                             handleImageUpload(e);
        //                         }}
        //                         multiple
        //                     />
        //                     +
        //                     <p className="m-0" style={{ fontWeight: 400, fontSize: 12 }}>
        //                         Add Sign
        //                     </p>
        //                 </label>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <div className="form-group">
            <label className="font-size-4 text-black-2 line-height-reset mb-3">{label}</label>

            <div className="border border-dark mb-3 w-100" style={{ maxWidth: '300px' }}>
                <SignatureCanvas
                    ref={sigPad}
                    penColor="black"
                    canvasProps={{ width: 300, height: 150, className: 'sigCanvas' }}
                />
            </div>

            {/* {selectedImage && (
        <div className="mb-3 d-flex justify-content-center">
            <div className="rounded overflow-hidden" style={{ width: '200px', height: '200px' }}>
                <img src={selectedImage} alt="Selected" className="img-fluid" style={{ objectFit: 'cover' }} />
            </div>
        </div>
    )} */}

            <div className="d-flex flex-row ">
                <label className="btn btn-light mx-3 mt-3 d-flex flex-column justify-content-center rounded "
                    style={{
                        position: "relative",
                        color: "grey",
                        minHeight: 50,
                        fontSize: 40,
                        flexDirection: "row",
                        lineHeight: 1,
                        left: "auto"
                    }}>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageUpload(e)}
                    />
                    <span style={{ fontSize: '24px' }}>+</span>
                    <p className="mb-0" style={{ fontWeight: 400, fontSize: 12 }}>Add Sign</p>
                </label>
                <button onClick={() => clear()} type='button' className="btn btn-secondary btn-sm  d-flex flex-column justify-content-center rounded"
                    style={{
                        position: "relative",
                        minHeight: 50,
                        flexDirection: "row",
                        lineHeight: 1,
                        left: "auto"
                    }}>Clear</button>
            </div>
        </div>

    );
};

export default SignaturePadComponent;
