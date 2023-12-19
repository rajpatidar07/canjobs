import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AddStripePalpay } from "../../api/api.js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    // return false;
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }
    let tokenData = await AddStripePalpay();
    let clientSecret = tokenData.data.message;
    const res_data = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "#",
      },
    });
    console.log("pop", res_data);

    if (res_data.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(res_data.error);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div>
      <PaymentElement />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!stripe || !elements}
      >
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

const stripePromise = loadStripe(
  "pk_test_51OOcaLA8p1T9ETlDszUVaF66gGesKprD6MVlSF2oecCY9P6qpcOZoZfb3dZ5QvlRPamQcDhwbz71sIVUzCfZe1YZ00XaboPbmY"
);

const options = {
  mode: "payment",
  amount: 80,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const StripePay = () => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements>
);
export default StripePay;
