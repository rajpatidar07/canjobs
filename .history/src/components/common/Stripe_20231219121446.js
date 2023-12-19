// import React, { useState } from "react";
// // import ReactDOM from 'react-dom';
// import { loadStripe } from "@stripe/stripe-js";
// import { FaStripe } from "react-icons/fa";
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { AddStripePalpay } from "../../api/api";

// const StripePay = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState(null);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (elements == null) {
//       return;
//     }
//     // Trigger form validation and wallet collection
//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       // Show error to your customer
//       setErrorMessage(submitError.message);
//       return;
//     }

//     // Create the PaymentIntent and obtain clientSecret from your server endpoint
//     // const res = await fetch('/create-intent', {
//     //   method: 'POST',
//     // });

//     // const { client_secret: clientSecret } = await res.json();
//     let token_data = await AddStripePalpay();
//     console.log("token_data.data=======================");
//     console.log(token_data.data);
//     let clientSecret = token_data.data.message;
//     const res_data = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: "http://indiakinursery.com",
//       },
//     });
//     console.log("res_data", res_data);

//     if (res_data.error) {
//       // This point will only be reached if there is an immediate error when
//       // confirming the payment. Show error to your customer (for example, payment
//       // details incomplete)
//       setErrorMessage(res_data.error);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <div>
//       <PaymentElement />
//       <button
//         className="btn btn-sm btn-info"
//         type="submit"
//         onClick={handleSubmit}
//         disabled={!stripe || !elements}
//       >
//         <FaStripe />
//       </button>
//       {/* Show error message to your customers */}
//       {errorMessage && <div>{errorMessage}</div>}
//     </div>
//   );
// };
// export default StripePay;
//----------------------------------------------------mm-------------------------------
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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (elements == null) {
  //     return;
  //   }
  //   console.log(elements);
  //   // return false;
  //   // Trigger form validation and wallet collection
  //   const { error: submitError } = await elements.submit();
  //   if (submitError) {
  //     // Show error to your customer
  //     setErrorMessage(submitError.message);
  //     return;
  //   }

  //   // Create the PaymentIntent and obtain clientSecret from your server endpoint
  //   // const res = await fetch('/create-intent', {
  //   //   method: 'POST',
  //   // });

  //   // const { client_secret: clientSecret } = await res.json();
  //   console.log("call b4 the --------AddStripePalpay");
  //   let tokenData = await AddStripePalpay();
  //   console.log(tokenData);
  //   console.log("call after the --------AddStripePalpay");

  //   let clientSecret =
  //     "pi_3OOfG1A8p1T9ETlD1N9hlH4l_secret_8em393jgYiEhE3A9cZYlM0j1M";
  //   const res_data = await stripe.confirmPayment({
  //     //`Elements` instance that was used to create the Payment Element
  //     elements,
  //     clientSecret,
  //     confirmParams: {
  //       return_url: "http://indiakinursery.com",
  //     },
  //   });
  //   console.log("res_data");
  //   console.log(res_data);

  //   if (res_data.error) {
  //     // This point will only be reached if there is an immediate error when
  //     // confirming the payment. Show error to your customer (for example, payment
  //     // details incomplete)
  //     setErrorMessage(res_data.error);
  //   } else {
  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //   }
  // };

  const handleSubmit = async (event) => {
    console.log("run--------------1");

    event.preventDefault();

    if (elements == null) {
      return;
    }
    console.log("run-------------2");

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    console.log("call before the --------AddStripePalpay");

    try {
      // Assuming AddStripePalpay returns a Promise
      let tokenData = await AddStripePalpay();
      console.log(tokenData);
      console.log("call after the --------AddStripePalpay");

      let clientSecret =
        "pi_3OOfG1A8p1T9ETlD1N9hlH4l_secret_8em393jgYiEhE3A9cZYlM0j1M";
      const res_data = await stripe.confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://indiakinursery.com",
        },
      });

      console.log("res_data");
      console.log(res_data);

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
    } catch (error) {
      console.error("Error in AddStripePalpay:", error);
      // Handle the error from AddStripePalpay
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="button" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
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
