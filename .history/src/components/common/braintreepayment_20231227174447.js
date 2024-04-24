import React, { useEffect, useState } from "react";
import dropin from "braintree-web-drop-in";
import { Button } from "react-bootstrap";
import { AddBrainTressPayment, AddPaymentToDataBase } from "../../api/api";
import { toast } from "react-toastify";
function BraintreeDropIn(props) {
  const { show, amount, setApicall, setState, state, setBraintreePayment } =
    props;
  let name = localStorage.getItem("name");
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);
  // authorization: "sandbox_s9gd7m2p_vp62s592633kc5p5", // insert your tokenization key or client token here
  useEffect(() => {
    if (show) {
      const initializeBraintree = () =>
        dropin.create(
          {
            authorization: "sandbox_w3mdsskj_dk55fvq2pb2s746h", // insert your tokenization key or client token here
            container: "#braintree-drop-in-div",
          },
          function (error, instance) {
            if (error) console.error(error);
            else setBraintreeInstance(instance);
          }
        );

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
  }, [show]);

  return (
    <div className="container braintree-container">
      <div style={{ display: `${show ? "block" : "none"}` }}>
        <div id={"braintree-drop-in-div"} />

        <Button
          className={"braintreePayButton btn btn-primary"}
          type="button"
          disabled={!braintreeInstance}
          onClick={() => {
            if (braintreeInstance) {
              braintreeInstance.requestPaymentMethod(async (error, payload) => {
                if (error) {
                  console.error(error);
                } else {
                  const paymentMethodNonce = payload.nonce;
                  try {
                    let res = await AddBrainTressPayment(
                      amount,
                      paymentMethodNonce,
                      name
                    );
                    if (res.data.success === true) {
                      let data = {
                        paymentID: res.data.paymentReceipt.id,
                        orderID: res.data.paymentReceipt.globalId,
                      };
                      let response = await AddPaymentToDataBase(
                        data,
                        props.user_id,
                        amount,
                        "Braintree",
                        props.user
                      );
                      if (response.status === 1 || "1") {
                        toast.success("Payment Successful.", {
                          position: toast.POSITION.TOP_RIGHT,
                          autoClose: 5000,
                        });
                        setApicall(true);
                        setBraintreePayment(false);
                        setState({ ...state, amount: "" });
                      }
                    }
                  } catch (Err) {
                    console.log(Err);
                  }
                }
              });
            }
          }}
        >
          {"Pay"}
        </Button>
      </div>
    </div>
  );
}

export default BraintreeDropIn;
