import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import SignaturePadComponent from './SignaturePadComponent';
import AggrementOne from './AgreementOne';
import { useNavigate } from 'react-router-dom';

const Commanforsignatureandpdf = () => {
    const navigate = useNavigate();
    const [signature, setSignature] = useState(null);

    return (
        <div>
            <h1>Signature Pad Example</h1>
            <SignaturePadComponent onSignature={setSignature} navigate={navigate} />
            {signature && (
                <div>
                    <PDFDownloadLink
                        document={<AggrementOne signature={signature} />}
                        fileName="signed_document.pdf"
                    >
                        {({ blob, url, loading, error }) => (
                            <button onClick={() => {
                                navigate("/addsign", { state: signature });
                            }}>
                                Download PDF
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default Commanforsignatureandpdf;
