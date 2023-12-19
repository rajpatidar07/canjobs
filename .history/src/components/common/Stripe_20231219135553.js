import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AddStripePalpay } from "../../api/api.js";

const CheckoutForm = ({
  amount,
  getAmt,
  setErrors,
  errors,
  setApicall,
  setState,
  state,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (event) => {
    console.log(amount, state);
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

    if (amount === 0 || amount === "" || amount === "0") {
      setErrors({
        ...errors,
        amount: "Please set the amount before payment",
      });
    } else {
      let tokenData = await AddStripePalpay(amount);
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
        setErrorMessage(res_data.error);
      } else {
      }
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

const StripePay = ({
  amount,
  getAmt,
  setErrors,
  errors,
  setApicall,
  setState,
  state,
}) => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm
      amount={amount}
      getAmt={getAmt}
      setErrors={setErrors}
      errors={errors}
      setApicall={setApicall}
      setState={setState}
      state={state}
    />
  </Elements>
);
export default StripePay;
