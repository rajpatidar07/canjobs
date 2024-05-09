import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import store from '../src/Store';
const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise = loadStripe(
  "pk_test_51OOcaLA8p1T9ETlDszUVaF66gGesKprD6MVlSF2oecCY9P6qpcOZoZfb3dZ5QvlRPamQcDhwbz71sIVUzCfZe1YZ00XaboPbmY"
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="654480915922-bgepo1btfcgm8n6mlc0ea7k8nj7l4ls7.apps.googleusercontent.com">
      <Elements stripe={stripePromise}>
        <Provider store={store}>
          <App />
        </Provider>
      </Elements>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import App from './App';
// import { createRoot } from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//     <GoogleOAuthProvider clientId="654480915922-bgepo1btfcgm8n6mlc0ea7k8nj7l4ls7.apps.googleusercontent.com">
//         <React.StrictMode>
//             <App />
//         </React.StrictMode>
//     </GoogleOAuthProvider>,
//     document.getElementById('root')
// );
