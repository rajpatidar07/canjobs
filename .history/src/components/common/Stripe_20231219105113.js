import React, { useState } from "react";
// import ReactDOM from 'react-dom';
import { loadStripe } from "@stripe/stripe-js";
import { FaStripe } from "react-icons/fa";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const StripePay = ({ token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    // const res = await fetch('/create-intent', {
    //   method: 'POST',
    // });

    // const { client_secret: clientSecret } = await res.json();
    let clientSecret = token;
    const res_data = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://indiakinursery.com",
      },
    });
    console.log("res_data", res_data);

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
        className="btn btn-sm btn-info"
        type="submit"
        onClick={handleSubmit}
        disabled={!stripe || !elements}
      >
        <FaStripe />
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};
export default StripePay;
