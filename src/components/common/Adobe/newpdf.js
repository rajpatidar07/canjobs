/* eslint-disable no-undef */
// // src/Newpdf.js
// import React, { useState, useEffect, useRef } from 'react';

// const users = [
//   { id: '1', name: 'John Doe' },
//   { id: '2', name: 'Jane Smith' },
//   { id: '3', name: 'Bob Johnson' },
// ];

// const Newpdf = () => {
//   const [value, setValue] = useState('');
//   const [valueemail, setValueemail] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (inputRef.current && !inputRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [inputRef]);

//   const handleChange = (event) => {
//     const { value } = event.target;
//     setValue(value);

//     const mentionIndex = value.lastIndexOf('@');
//     if (mentionIndex !== -1) {
//       const search = value.substring(mentionIndex + 1);
//       if (search) {
//         const filteredSuggestions = users.filter((user) =>
//           user.name.toLowerCase().includes(search.toLowerCase())
//         );
//         setSuggestions(filteredSuggestions);
//         setShowSuggestions(true);
//       } else {
//         setShowSuggestions(false);
//       }
//     } else {
//       setShowSuggestions(false);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     const mentionIndex = value.lastIndexOf('@');
//     const newValue =
//       value.substring(0, mentionIndex + 1) + suggestion.name + ' ';
//       setValueemail(newValue);
//     setShowSuggestions(false);
//   };
// console.log(value,"pop",valueemail)
//   return (
//     <div ref={inputRef} style={{ position: 'relative' }}>
//       <textarea
//         value={value}
//         onChange={handleChange}
//         placeholder="Type @ to mention someone"
//         style={{ width: '300px', height: '100px', border: '1px solid #ccc', padding: '10px' }}
//       />
//       {showSuggestions && (
//         <ul
//           style={{
//             position: 'absolute',
//             top: '100px',
//             left: '10px',
//             border: '1px solid #ccc',
//             backgroundColor: 'white',
//             listStyleType: 'none',
//             padding: '0',
//             margin: '0',
//             width: '280px',
//             maxHeight: '100px',
//             overflowY: 'auto',
//           }}
//         >
//           {suggestions.map((suggestion) => (
//             <li
//               key={suggestion.id}
//               onClick={() => handleSuggestionClick(suggestion)}
//               style={{
//                 padding: '5px 10px',
//                 cursor: 'pointer',
//               }}
//             >
//               {suggestion.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Newpdf;
// COde to mention the admin in input feild
// import React, { useState, useRef } from 'react';

// const users = [
//   { id: '1', name: 'John Doe', email: 'john@example.com' },
//   { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
//   { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
// ];

// const Newpdf = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [mentioning, setMentioning] = useState(false);
//   const inputRef = useRef(null);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);

//     const cursorPosition = e.target.selectionStart;
//     const textBeforeCursor = value.substring(0, cursorPosition);
//     const lastWord = textBeforeCursor.split(' ').pop();

//     if (lastWord.startsWith('@')) {
//       const query = lastWord.substring(1);
//       if (query) {
//         const filteredUsers = users.filter(user =>
//           user.email.toLowerCase().includes(query.toLowerCase())
//         );
//         setSuggestions(filteredUsers);
//         setMentioning(true);
//       } else {
//         setSuggestions(users);
//         setMentioning(true);
//       }
//     } else {
//       setMentioning(false);
//     }
//   };

//   const handleSelectSuggestion = (user) => {
//     const cursorPosition = inputRef.current.selectionStart;
//     const textBeforeCursor = inputValue.substring(0, cursorPosition);
//     const textAfterCursor = inputValue.substring(cursorPosition);

//     const lastWordStart = textBeforeCursor.lastIndexOf('@');
//     const newTextBeforeCursor = textBeforeCursor.substring(0, lastWordStart);

//     const newValue = `${newTextBeforeCursor}@${user.email} ${textAfterCursor}`;
//     setInputValue(newValue);
//     setMentioning(false);
//     inputRef.current.focus();
//   };

//   return (
//     <div style={{ position: 'relative', width: '300px' }}>
//       <textarea
//         ref={inputRef}
//         value={inputValue}
//         onChange={handleChange}
//         placeholder="Type @ to mention someone"
//         style={{ width: '100%', height: '100px', padding: '10px', boxSizing: 'border-box' }}
//       />
//       {mentioning && suggestions.length > 0 && (
//         <ul
//           style={{
//             position: 'absolute',
//             top: '100px',
//             left: '0',
//             right: '0',
//             background: '#fff',
//             border: '1px solid #ccc',
//             listStyleType: 'none',
//             margin: 0,
//             padding: 0,
//             maxHeight: '150px',
//             overflowY: 'auto',
//           }}
//         >
//           {suggestions.map(user => (
//             <li
//               key={user.id}
//               onClick={() => handleSelectSuggestion(user)}
//               style={{ padding: '10px', cursor: 'pointer' }}
//             >
//               {user.email}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Newpdf;
/*Crud to add country ,state and city to the local storage and get it from there in select box */
// import React, { useState, useEffect } from 'react';

// const Newpdf = () => {
//   const [data, setData] = useState({});
//   const [progress, setProgress] = useState(0);
//   const [form, setForm] = useState({ country: '', state: '', city: '', selectedCountry: '', selectedState: '' });

//   useEffect(() => {
//     const savedData = localStorage.getItem('countryStateCityData');
//     if (savedData) setData(JSON.parse(savedData));
//   }, []);

//   const saveData = (newData) => {
//     setData(newData);
//     localStorage.setItem('countryStateCityData', JSON.stringify(newData));
//   };

//   const handleSubmit = (e, type) => {
//     e.preventDefault();
//     const { country, state, city, selectedCountry, selectedState } = form;

//     let newData = {...data };
//     if (type === 'country') newData[country] = {};
//     if (type === 'state') newData[selectedCountry][state] = [];
//     if (type === 'city') newData[selectedCountry][selectedState].push(city);

//     saveData(newData);
//     setForm({...form, [type]: '' });

//     let newProgress = progress;
//     if (type === 'country') newProgress += 40;
//     else newProgress += 30;
//     setProgress(newProgress > 100? 100 : newProgress);
//   };

//   const handleChange = (e) => {
//     setForm({...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <h1>Country, State, City</h1>

//       <form onSubmit={(e) => handleSubmit(e, 'country')}>
//         <input name="country" value={form.country} onChange={handleChange} placeholder="Add Country" required />
//         <button type="submit">Add Country</button>
//       </form>

//       <form onSubmit={(e) => handleSubmit(e, 'tate')}>
//         <select name="selectedCountry" value={form.selectedCountry} onChange={handleChange} required>
//           <option value="" disabled>Select Country</option>
//           {Object.keys(data).map((country) => (
//             <option key={country} value={country}>{country}</option>
//           ))}
//         </select>
//         <input name="state" value={form.state} onChange={handleChange} placeholder="Add State" required />
//         <button type="submit">Add State</button>
//       </form>

//       <form onSubmit={(e) => handleSubmit(e, 'city')}>
//         <select name="selectedCountry" value={form.selectedCountry} onChange={handleChange} required>
//           <option value="" disabled>Select Country</option>
//           {Object.keys(data).map((country) => (
//             <option key={country} value={country}>{country}</option>
//           ))}
//         </select>
//         <select name="selectedState" value={form.selectedState} onChange={handleChange} required>
//           <option value="" disabled>Select State</option>
//           {form.selectedCountry && Object.keys(data[form.selectedCountry] || {}).map((state) => (
//             <option key={state} value={state}>{state}</option>
//           ))}
//         </select>
//         <input name="city" value={form.city} onChange={handleChange} placeholder="Add City" required />
//         <button type="submit">Add City</button>
//       </form>

//       <div>
//         <h2>Data:</h2>
//         {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
//         <h2>Progress</h2>
//         {progress}%
//       </div>
//       <div className="progress" style={{ height: "20px" }}>
//         <div className="progress-bar" role="progressbar" aria-label="Example 20px high" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
//       </div>
//     </div>
//   );
// };

// export default Newpdf;
// import { useEffect, useRef } from "react"
// import PSPDFKit from "pspdfkit";
// import { Modal } from "react-bootstrap";
// export default function Newpdf({document,close,show}) {
//   const containerRef = useRef(null);
//   // let document = "https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=d4410fbf-3895-4b2c-80a1-c48948ddf0c4&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJjOTgxNDg4OS00NmIxLTQ1NTgtOWZhOS02NzUyNjJlNTJhYWQiLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiZXhwIjoiMTcyMTc5ODQyMiJ9.CgoKBHNuaWQSAjY0EgsImpW0-77olT0QBRoLMjAuMjAuMzIuOTYqLFVEK24ybk9sbDZXU3d1Rm5pSWlDaGwxeUQ2UTVwRXhFR0RLdVF4M3NneDQ9MJABOAFCEKE_Uk2OgABgFE4h-XWA8lxKEGhhc2hlZHByb29mdG9rZW56ATG6AUBhbGxzaXRlcy53cml0ZSBhbGxmaWxlcy53cml0ZSBhbGxmaWxlcy5yZWFkIGFsbHNpdGVzLmZ1bGxjb250cm9swgFJZDEwMWM4YWQtZTI2My00YzBhLThkYjMtM2JhMmFkMWY4ZWE2QDQ2MzkyYjdkLTNmYTctNGNjOC1iOWRkLWIwNWExZGY5ZTc0NcgBAQ.wSEiu_A4kPGW9Xh_Y1rDvQ4o4QnXHDOl-C9Z6i-DYwA&ApiVersion=2.0";
//   useEffect(() => {
//     const container = containerRef.current;
//     let instance;

//     (async function () {
//       if (!document) {
//         console.error("Document prop is required.");
//         return;
//       }

//       try {
//         if (instance) {
//           PSPDFKit.unload(container);
//         }

//         instance = await PSPDFKit.load({
//           container,
//           license:
//             "zFV8P9YHvxGpBc0Tp-W4cg6Fl-zD9VyTWQGiJTi1A0pM18iMZUQDrARKsunUn4oFAuan32RJzCDR--1nglDFAeacyOumrQOdc7aLnh0zkUHLoL9ZIyYS885cFaZySBalYNU4cbnmdUaZUlte0UEfoF8wM-_lJnbFYTYyWvpuPQ7BICRjm9_SGVz9V8bQGEU3OjpqY_YsvjfyRw", // Replace with your actual license key
//           document: document,
//           baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
//           CommentMarkerAnnotation: true,
//           setOnCommentCreationStart: true,
//           toolbarItems: PSPDFKit.defaultToolbarItems.concat({
//             type: "annotate",
//           }),
//           // mentionableUsers: props.adminDetailsFOrMention,
//           autoSaveMode: PSPDFKit.AutoSaveMode.IMMEDIATE,
//           enableRichText: () => true,
//           instant: true,
//         });
//       } catch (error) {
//         console.error("Error loading PSPDFKit or document:", error);
//       }
//     })();

//     return () => {
//       if (instance) {
//         PSPDFKit.unload(container);
//       }
//     };
//   }, [document]);

//   return(
//   <Modal
//   show={show}
//   size="lg"
//   aria-labelledby="contained-modal-title-vcenter"
//   centered
// >
//   <button
//     type="button"
//     className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
//     data-dismiss="modal"
//     onClick={close}
//   >
//     <i className="fas fa-times"></i>
//   </button>
//   <div className="bg-white rounded h-100 px-11 pt-7">
//   {/* <iframe src="https://secure.na4.echosign.com/public/apiesign?pid=CBFCIBAA3AAABLblqZhD8qok13mGozwyksKBtLyYjmizM78xPFwxtUyCD9RREJofIX5fEzzVw3uKk18C1R4KbmcP1XQO6HaItIHdxKMNd&client_id=BGBQIIE7H253K6" width="100%" height="100%" frameborder="0" style={{border: "0", overflow: "hidden", minHeight: "100vh", minWidth: "600px",}}title="Agreement"></iframe> */}
//      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
//      </div>
//      </Modal>
//      )
// }
//02
//   import { useEffect, useRef } from "react";
// import PSPDFKit from "pspdfkit";

// export default function Newpdf() {
//   const containerRef = useRef(null);
//   let document = "https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=16cbff2a-a143-4726-be27-d2b5c9df1187&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJjOTgxNDg4OS00NmIxLTQ1NTgtOWZhOS02NzUyNjJlNTJhYWQiLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiZXhwIjoiMTcyMTY1NjE5MCJ9.CgoKBHNuaWQSAjY0EgsInvD-8NmVlT0QBRoOMjAuMjMxLjEzOC4yMjQqLHA1aCtPazYzWWo0UFdNcy9oNzdLTVhhZlNzbUlKeEorYjB0cTZJWGg5OFE9MJABOAFCEKE-yqkDgABgCInQU9aPHLpKEGhhc2hlZHByb29mdG9rZW56ATG6AUBhbGxzaXRlcy53cml0ZSBhbGxmaWxlcy53cml0ZSBhbGxmaWxlcy5yZWFkIGFsbHNpdGVzLmZ1bGxjb250cm9swgFJZDEwMWM4YWQtZTI2My00YzBhLThkYjMtM2JhMmFkMWY4ZWE2QDQ2MzkyYjdkLTNmYTctNGNjOC1iOWRkLWIwNWExZGY5ZTc0NcgBAQ.HFcH3yh99nbVNTEJ4egR1hwUFBBxi3hiKyqmdMd4g-0&ApiVersion=2.0"


//   useEffect(() => {
//     const container = containerRef.current;
//     let instance;

//     (async function () {
//       if (!document) {
//         console.error("Document prop is required.");
//         return;
//       }

//       try {
//         if (instance) {
//           PSPDFKit.unload(container);
//         }
//         instance = await PSPDFKit.load({
//           container,
//           license: "zFV8P9YHvxGpBc0Tp-W4cg6Fl-zD9VyTWQGiJTi1A0pM18iMZUQDrARKsunUn4oFAuan32RJzCDR--1nglDFAeacyOumrQOdc7aLnh0zkUHLoL9ZIyYS885cFaZySBalYNU4cbnmdUaZUlte0UEfoF8wM-_lJnbFYTYyWvpuPQ7BICRjm9_SGVz9V8bQGEU3OjpqY_YsvjfyRw", // Replace with your actual license key
//           document: document,
//           baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
//           toolbarItems: PSPDFKit.defaultToolbarItems.concat({
//             type: "signature",
//           }),
//           autoSaveMode: PSPDFKit.AutoSaveMode.IMMEDIATE,
//           enableRichText: () => true,
//           instant: true,
//           mode: "no-cors",
//         });

//         // Add form field handling logic here
//         const formFields = await instance.getFormFields();

//         // Update the value of all text form fields.
//         const updatedFormFieldValues = formFields
//           .filter((formField) => formField instanceof PSPDFKit.FormFields.TextFormField)
//           .reduce((o, formField) => {
//             o[formField.name] = "New Value";
//             return o;
//           }, {});

//         await instance.setFormFieldValues(updatedFormFieldValues);

//         // Handle signature field
//         const formFieldName = "signature";
//         const signatureField = formFields.find(
//           (formField) =>
//             formField.name === formFieldName &&
//             formField instanceof PSPDFKit.FormFields.SignatureFormField
//         );

//         if (signatureField) {
//           const annotations = await instance.getAnnotations(0);
//           const widget = annotations.find(
//             (annotation) =>
//               annotation instanceof PSPDFKit.Annotations.WidgetAnnotation &&
//               annotation.formFieldName === signatureField.name
//           );

//           if (widget) {
//             const inkAnnotation = new PSPDFKit.Annotations.InkAnnotation({
//               pageIndex: 0,
//               lines: PSPDFKit.Immutable.List([
//                 PSPDFKit.Immutable.List([
//                   new PSPDFKit.Geometry.DrawingPoint({
//                     x: widget.boundingBox.left + 5,
//                     y: widget.boundingBox.top + 5,
//                   }),
//                   new PSPDFKit.Geometry.DrawingPoint({
//                     x: widget.boundingBox.left + widget.boundingBox.width - 10,
//                     y: widget.boundingBox.top + widget.boundingBox.height - 10,
//                   }),
//                 ]),
//                 PSPDFKit.Immutable.List([
//                   new PSPDFKit.Geometry.DrawingPoint({
//                     x: widget.boundingBox.left + widget.boundingBox.width - 10,
//                     y: widget.boundingBox.top + 5,
//                   }),
//                   new PSPDFKit.Geometry.DrawingPoint({
//                     x: widget.boundingBox.left + 5,
//                     y: widget.boundingBox.top + widget.boundingBox.height - 10,
//                   }),
//                 ]),
//               ]),
//               boundingBox: widget.boundingBox,
//               isSignature: true,
//             });

//             await instance.create(inkAnnotation);

//             // Check if the signature form field has been signed
//             const overlappingAnnotations = await instance.getOverlappingAnnotations(signatureField);

//             // If no annotation overlaps the form field, the list will be empty
//             if (overlappingAnnotations.length === 0) {
//               console.log("Signature form field is not signed yet.");
//             } else {
//               console.log("Signature form field has been signed.");
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error loading PSPDFKit or document:", error);
//       }
//     })();

//     return () => {
//       if (instance) {
//         PSPDFKit.unload(container);
//       }
//     };
//   }, [document]);

//   return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
// }
//03
// import React, { useEffect, useRef } from 'react';
// import PSPDFKit from 'pspdfkit';

// const Newpdf = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const loadPSPDFKit = async () => {
//       try {
//         const instance = await PSPDFKit.load({
//           container: containerRef.current,
//           document:"https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=9c87be21-2f18-4373-a9eb-7484faaadf2d&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJjOTgxNDg4OS00NmIxLTQ1NTgtOWZhOS02NzUyNjJlNTJhYWQiLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiZXhwIjoiMTcyMTcyODc4OCJ9.CgoKBHNuaWQSAjY0EgsIhoy97Pq_lT0QBRoMNDAuMTI2LjU3LjI0KixLNzRVWWwwN1ZOTnRFanFyelZwNC9Fd05LUHFqbDJsRUJGVkJ1M2d6My9RPTCQATgBQhChPw_lItAAYAiJ2sK3_mHJShBoYXNoZWRwcm9vZnRva2VuegExugFAYWxsc2l0ZXMud3JpdGUgYWxsZmlsZXMud3JpdGUgYWxsZmlsZXMucmVhZCBhbGxzaXRlcy5mdWxsY29udHJvbMIBSWQxMDFjOGFkLWUyNjMtNGMwYS04ZGIzLTNiYTJhZDFmOGVhNkA0NjM5MmI3ZC0zZmE3LTRjYzgtYjlkZC1iMDVhMWRmOWU3NDXIAQE.ayHlFI24KDbs0Gn1cfERSInoHPij4g-c9tlMMklzCu8&ApiVersion=2.0"


// ,
//           baseUrl: `${window.location.protocol}//${window.location.host}/`,
//           license:"zFV8P9YHvxGpBc0Tp-W4cg6Fl-zD9VyTWQGiJTi1A0pM18iMZUQDrARKsunUn4oFAuan32RJzCDR--1nglDFAeacyOumrQOdc7aLnh0zkUHLoL9ZIyYS885cFaZySBalYNU4cbnmdUaZUlte0UEfoF8wM-_lJnbFYTYyWvpuPQ7BICRjm9_SGVz9V8bQGEU3OjpqY_YsvjfyRw", 
//           })

//         // Store instance in a ref to access later
//         containerRef.current.instance = instance;
//       } catch (error) {
//         console.error('Error loading PSPDFKit:', error);
//       }
//     };

//     loadPSPDFKit();

//     return () => PSPDFKit.unload(containerRef.current);
//   }, []);

//   const fillForm = async () => {
//     const { instance } = containerRef.current;
//     if (!instance) return;

//     try {
//       const formFields = await instance.getFormFields();

//       const updatedFormFieldValues = formFields
//         .filter(formField => formField instanceof PSPDFKit.FormFields.TextFormField)
//         .reduce((o, formField) => {
//           o[formField.name] = 'New Value';
//           return o;
//         }, {});

//       await instance.setFormFieldValues(updatedFormFieldValues);
//     } catch (error) {
//       console.error('Error filling form fields:', error);
//     }
//   };

//   const addSignature = async () => {
//     const { instance } = containerRef.current;
//     if (!instance) return;
// console.log(PSPDFKit.FormFields)
//     try {
//       const formFieldName = 'signature';
//       const formFields = await instance.getFormFields();
//       console.log(formFields)
//       const field = formFields.find(
//         formField =>
//           formField.name === formFieldName &&
//           formField instanceof PSPDFKit.FormFields.SignatureFormField
//       );

//       if (!field) {
//         console.error('Signature form field not found.');
//         return;
//       }

//       const annotations = await instance.getAnnotations(0);
//       const widget = annotations.find(
//         annotation =>
//           annotation instanceof PSPDFKit.Annotations.WidgetAnnotation &&
//           annotation.formFieldName === field.name
//       );

//       if (!widget) {
//         console.error('Widget for signature form field not found.');
//         return;
//       }

//       const annotation = new PSPDFKit.Annotations.InkAnnotation({
//         pageIndex: 0,
//         lines: PSPDFKit.Immutable.List([
//           PSPDFKit.Immutable.List([
//             new PSPDFKit.Geometry.DrawingPoint({
//               x: widget.boundingBox.left + 5,
//               y: widget.boundingBox.top + 5,
//             }),
//             new PSPDFKit.Geometry.DrawingPoint({
//               x: widget.boundingBox.left + widget.boundingBox.width - 10,
//               y: widget.boundingBox.top + widget.boundingBox.height - 10,
//             }),
//           ]),
//           PSPDFKit.Immutable.List([
//             new PSPDFKit.Geometry.DrawingPoint({
//               x: widget.boundingBox.left + widget.boundingBox.width - 10,
//               y: widget.boundingBox.top + 5,
//             }),
//             new PSPDFKit.Geometry.DrawingPoint({
//               x: widget.boundingBox.left + 5,
//               y: widget.boundingBox.top + widget.boundingBox.height - 10,
//             }),
//           ]),
//         ]),
//         boundingBox: widget.boundingBox,
//         isSignature: true,
//       });

//       await instance.create(annotation);

//       const overlappingAnnotations = await instance.getOverlappingAnnotations(field);
//       if (overlappingAnnotations.length === 0) {
//         console.log('No signature found.');
//       } else {
//         console.log('Signature present.');
//       }
//     } catch (error) {
//       console.error('Error adding signature:', error);
//     }
//   };

//   return (
//     <div className='h-100vh w-100 p-10 overflow-visible'>
//       <div ref={containerRef} style={{ height: '100vh' }} />
//       <button onClick={fillForm}>Fill Form</button>
//       <button onClick={addSignature}>Add Signature</button>
//     </div>
//   );
// };

// export default Newpdf;

//05
// import React from 'react';
// import axios from 'axios';
// const Newpdf = ({ data }) => {

//   const handleButtonClick = async (pdfUrl) => {
//     try {
//       // Your Adobe Sign API endpoint
//       const apiEndpoint = 'https://api.adobesign.com/api/rest/v6/agreements';

//       // Adobe Sign API credentials and request payload
//       const response = await axios.post(apiEndpoint, {
//         documentName: 'Sample Document',
//         fileInfos: [{ url: pdfUrl }],
//         // Additional parameters like recipient info, signature fields, etc.
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem("token")}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Response:', response.data);
//       // Handle the response as needed, e.g., redirect to the signing URL or notify the user

//     } catch (error) {
//       console.error('Error sending document for signing:', error);
//     }
//   };
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Class</th>
//           <th>Contact</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//           <tr >
//             <td>Aashi</td>
//             <td>10</td>
//             <td>9857412036</td>
//             <td>
//               <button onClick={() => handleButtonClick("https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=9c87be21-2f18-4373-a9eb-7484faaadf2d&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJjOTgxNDg4OS00NmIxLTQ1NTgtOWZhOS02NzUyNjJlNTJhYWQiLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiZXhwIjoiMTcyMTcyODc4OCJ9.CgoKBHNuaWQSAjY0EgsIhoy97Pq_lT0QBRoMNDAuMTI2LjU3LjI0KixLNzRVWWwwN1ZOTnRFanFyelZwNC9Fd05LUHFqbDJsRUJGVkJ1M2d6My9RPTCQATgBQhChPw_lItAAYAiJ2sK3_mHJShBoYXNoZWRwcm9vZnRva2VuegExugFAYWxsc2l0ZXMud3JpdGUgYWxsZmlsZXMud3JpdGUgYWxsZmlsZXMucmVhZCBhbGxzaXRlcy5mdWxsY29udHJvbMIBSWQxMDFjOGFkLWUyNjMtNGMwYS04ZGIzLTNiYTJhZDFmOGVhNkA0NjM5MmI3ZC0zZmE3LTRjYzgtYjlkZC1iMDVhMWRmOWU3NDXIAQE.ayHlFI24KDbs0Gn1cfERSInoHPij4g-c9tlMMklzCu8&ApiVersion=2.0")}>Assign Fields</button>
//             </td>
//           </tr>
//       </tbody>
//     </table>
//   );
// };

// export default Newpdf;



// 01
//   import { useEffect, useRef } from "react";
// import PSPDFKit from "pspdfkit";

// export default function Newpdf() {
//   const containerRef = useRef(null);
//   let document ="https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=16cbff2a-a143-4726-be27-d2b5c9df1187&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJjOTgxNDg4OS00NmIxLTQ1NTgtOWZhOS02NzUyNjJlNTJhYWQiLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiZXhwIjoiMTcyMTY1NjE5MCJ9.CgoKBHNuaWQSAjY0EgsInvD-8NmVlT0QBRoOMjAuMjMxLjEzOC4yMjQqLHA1aCtPazYzWWo0UFdNcy9oNzdLTVhhZlNzbUlKeEorYjB0cTZJWGg5OFE9MJABOAFCEKE-yqkDgABgCInQU9aPHLpKEGhhc2hlZHByb29mdG9rZW56ATG6AUBhbGxzaXRlcy53cml0ZSBhbGxmaWxlcy53cml0ZSBhbGxmaWxlcy5yZWFkIGFsbHNpdGVzLmZ1bGxjb250cm9swgFJZDEwMWM4YWQtZTI2My00YzBhLThkYjMtM2JhMmFkMWY4ZWE2QDQ2MzkyYjdkLTNmYTctNGNjOC1iOWRkLWIwNWExZGY5ZTc0NcgBAQ.HFcH3yh99nbVNTEJ4egR1hwUFBBxi3hiKyqmdMd4g-0&ApiVersion=2.0"

//   useEffect(() => {
//     const container = containerRef.current;
//     let instance;

//     (async function () {
//       if (!document) {
//         console.error("Document prop is required.");
//         return;
//       }

//       try {        
//         if (instance) {
//           PSPDFKit.unload(container);
//         };
//         instance = await PSPDFKit.load({
//           container,
//           license: "zFV8P9YHvxGpBc0Tp-W4cg6Fl-zD9VyTWQGiJTi1A0pM18iMZUQDrARKsunUn4oFAuan32RJzCDR--1nglDFAeacyOumrQOdc7aLnh0zkUHLoL9ZIyYS885cFaZySBalYNU4cbnmdUaZUlte0UEfoF8wM-_lJnbFYTYyWvpuPQ7BICRjm9_SGVz9V8bQGEU3OjpqY_YsvjfyRw", // Replace with your actual license key
//           document: document,
//           baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
//           CommentMarkerAnnotation: true,
//           setOnCommentCreationStart: true,
//           toolbarItems: PSPDFKit.defaultToolbarItems.concat({
//             type: "signature",
//           }),
//           autoSaveMode: PSPDFKit.AutoSaveMode.IMMEDIATE,
//           enableRichText: () => true,
//           instant: true,
//           mode: 'no-cors', // Add this line
//           // electronicSignatures:SignaturePad,
//           // widget, formField
//         });
//         console.log(instance)

//       } catch (error) {
//         console.error("Error loading PSPDFKit or document:", error);
//       }
//     })();

//     return () => {
//       if (instance) {
//         PSPDFKit.unload(container);
//       }
//     };
//   }, [document]);
//   return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
// }

/*List code with add update delete */
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Newpdf = () => {
//   const [students, setStudents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentStudent, setCurrentStudent] = useState({});
//   const [studentDetails, setStudentDetails] = useState({
//     name: '',
//     class: '',
//     contact: '',
//     father: ''
//   });
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const handleOpenModal = (student = null) => {
//     if (student) {
//       setEditMode(true);
//       setCurrentStudent(student);
//       setStudentDetails(student);
//     } else {
//       setEditMode(false);
//       setStudentDetails({ name: '', class: '', contact: '', father: '' });
//     }
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setStudentDetails({ name: '', class: '', contact: '', father: '' });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudentDetails({
//       ...studentDetails,
//       [name]: value
//     });
//   };

//   const handleAddStudent = () => {
//     setStudents([...students, { ...studentDetails, id: Date.now() }]);
//     handleCloseModal();
//   };

//   const handleUpdateStudent = () => {
//     setStudents(students.map(student => student.id === currentStudent.id ? studentDetails : student));
//     handleCloseModal();
//   };

//   const handleDeleteStudent = (student) => {
//     setCurrentStudent(student);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDeleteStudent = () => {
//     setStudents(students.filter(student => student.id !== currentStudent.id));
//     setShowDeleteConfirm(false);
//   };

//   return (
//     <div className="container">
//       <h1 className='text-center'>Student's Details</h1>
//       <div className=' d-flex justify-content-end'>
//         <button className='btn btn-secondary ' onClick={() => handleOpenModal()}>Add Student</button>
//       </div>
//       <table className="student-table">
//         <thead>
//           <tr>
//             <th>S.No.</th>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Contact</th>
//             <th>Father</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student,index) => (
//             <tr key={student.id}>
//               <td>{index+1}</td>
//               <td className='text-capitalize'>{student.name}</td>
//               <td className='text-capitalize'>{student.class}</td>
//               <td className='text-capitalize'>{student.contact}</td>
//               <td className='text-capitalize'>{student.father}</td>
//               <td >
//                 <div className='row p-1'>
//                   <Link className="bg-secondary text-white text-center col mx-2" onClick={() => handleOpenModal(student)}><i className="fas fa-edit"></i></Link>
//                   <Link className="bg-danger text-white text-center col mx-2" onClick={() => handleDeleteStudent(student)}><i class="fa fa-trash"></i></Link>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3 className='text-center'>{editMode ? 'Edit' : 'Add'} Student</h3>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={studentDetails.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="class"
//               placeholder="Class"
//               value={studentDetails.class}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="number"
//               name="contact"
//               placeholder="Contact"
//               value={studentDetails.contact}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="father"
//               placeholder="Father's Name"
//               value={studentDetails.father}
//               onChange={handleChange}
//               required
//             />
//             <div className='row'>
//               <button className='btn btn-danger m-3 col' onClick={handleCloseModal}>Cancel</button>
//               <button type='submit' className='btn btn-success m-3 col' onClick={editMode ? handleUpdateStudent : handleAddStudent}>
//                 {editMode ? 'Update' : 'Add'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showDeleteConfirm && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Confirm Delete</h2>
//             <p>Are you sure you want to delete {currentStudent.name}?</p>
//             <div className='row'>
//               <button className='btn btn-success m-3 col' onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
//               <button className='btn btn-secondary m-3 col' onClick={confirmDeleteStudent}>Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newpdf;

// import React, { useEffect, useState } from 'react';
// import SignaturePadComponent from '../../common/Retaineragreement/SignaturePadComponent';
// import { AddUpdateAgreement, GetAgreement } from "../../../api/api";
// import useValidation from '../../common/useValidation';
// import { toast } from 'react-toastify';
// import { Modal } from "react-bootstrap"
// const Newpdf = ({
//   folderId,
//   user_id,
//   openSignature,
//   emp_user_type,
//   show,
//   close,
//   userData,
//   setApicall,
//   felidData
// }) => {
//   const [loading, setLoading] = useState(false);
//   let SigningUserType = ""//localStorage.getItem("userType");

//   const initialClientState = {
//     client_first_name: "",
//     client_last_name: "",
//     client_signature: "",
//     date_signature_client: "",
//     client_date_of_birth:""
//   };

//   const initialFormState = {
//     type: "temporary resident visa",
//     rcic_membership_no: "",
//     matter: "",
//     summary: "",
//     initial: "",
//     professional_fees: "",
//     courier_charges: "",
//     government_fees: "",
//     application_fees: "",
//     biometrics_fees: "",
//     administrative_fee: "",
//     applicable_taxes: "",
//     balance: "",
//     total_cost: "",
//     applicable_retainer_fee_stape_1: "",
//     applicable_government_processing_fee_stape_1: "",
//     applicable_retainer_fee_stape_2: "",
//     applicable_government_processing_fee_stape_2: "",
//     total_amount_signing_of_contract: "",
//     balance_paid_at_time_of_filing: "",
//     rcic_first_name: "",
//     rcic_last_name: "",
//     rcic_signature: "",
//     date_signature_client: "",
//     date_signature_rcic: "",
//     sender: localStorage.getItem("admin_id"),
//     sender_type: localStorage.getItem("admin_type"),
//     receiver: "",
//     receiver_type: "",
//     assigned_by_id: "",
//     assigned_by_type: "",
//     signature_status: 0,
//     id: "",
//     client_file_no: "",
//     agreement_date: "",
//     client_email: "",
//     client_contact: "",
//     client_telephone: "",
//     client_cellphone: "",
//     client_fax: "",
//     client_address: "",
//     family_json: [initialClientState]
//   };

//   const validators = {
//     family_json: {
//       validateClientEmail: (value) =>
//         value === "" || value.trim() === "" ? "Client's Email is required" : /\S+@\S+\.\S+/.test(value) ? null : "Client's Email is invalid",
//     },
//   };

//   const { state, setState, onInputChange, errors } = useValidation(initialFormState, validators);

//   // useEffect(() => {
//   //   if (felidData) {
//   //     const updatedState = { ...initialFormState };
//   //     for (const key in felidData) {
//   //       if (felidData[key] !== null && felidData[key] !== undefined) {
//   //         updatedState[key] = felidData[key];
//   //       }
//   //     }
//   //     setState(updatedState);
//   //   } else {
//   //     setState(initialFormState);
//   //   }
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [felidData]);
//   useEffect(() => {
//     if (felidData) {
//       const updatedState = { ...initialFormState };

//       // Parse the family_json field
//       if (felidData.family_json) {
//         try {
//           updatedState.family_json = JSON.parse(felidData.family_json);
//         } catch (error) {
//           console.error('Failed to parse family_json:', error);
//         }
//       }

//       // Update the rest of the state with felidData
//       for (const key in felidData) {
//         if (felidData[key] !== null && felidData[key] !== undefined && key !== 'family_json') {
//           updatedState[key] = felidData[key];
//         }
//       }

//       setState(updatedState);
//     }
//   }, [felidData]);

//   const addClient = () => {
//     setState((prevState) => ({
//       ...prevState,
//       family_json: [...prevState.family_json, { ...initialClientState }]
//     }));
//   };

//   const removeClient = (index) => {
//     setState((prevState) => ({
//       ...prevState,
//       family_json: prevState.family_json.filter((_, i) => i !== index)
//     }));
//   };

//   const handleClientChange = (index, event) => {
//     const { name, value } = event.target;
//     setState((prevState) => {
//       const family_json = [...prevState.family_json];
//       family_json[index] = { ...family_json[index], [name]: value };
//       return { ...prevState, family_json };
//     });
//   };

//   const onFormSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let res = await AddUpdateAgreement(state);
//       if (res.data.status === 1 && res.data.message === "Agreement updated successfully.") {
//         setLoading(false);
//         setState(initialFormState);
//         toast.success("Fields added successfully.", {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 1000,
//         });

//         try {
//           let res = await GetAgreement("", user_id, emp_user_type, felidData.type);
//           const stateData = {
//             user_id: user_id,
//             emp_user_type: emp_user_type,
//             folderId: folderId,
//             felidData: res.data.data[0],
//           };
//           const newPageUrl = `/agreeone`;
//           localStorage.setItem('agreementStateData', JSON.stringify(stateData));
//           setApicall(true);
//           close();
//           window.open(newPageUrl, '_blank');
//         } catch (error) {
//           console.log(error);
//         }
//         close();
//         setApicall(true);
//       }
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (state.initial) {
//       setState({ ...state, signature_status: "1", pdf_genrated_status: "1" });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state.initial]);

//   const handleSignature = (signature, clientIndex) => {
//     const today = new Date().toISOString().split('T')[0];
//     setState((prevState) => {
//       const family_json = [...prevState.family_json];
//       family_json[clientIndex] = { ...family_json[clientIndex], client_signature: signature, date_signature_client: today };
//       return { ...prevState, family_json };
//     });
//   };

//   return (
//     <Modal
//       show={show}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <button
//         type="button"
//         className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
//         data-dismiss="modal"
//         onClick={() => { close() }}
//       >
//         <i className="fas fa-times"></i>
//       </button>
//       <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
//         <form onSubmit={onFormSubmit}>
//           <h5 className="text-center mb-7 pt-2">{openSignature === "yes" ? "Add Signature" : "Add Retainer Agreement Fields"}</h5>
//           <div className="row">
//             {openSignature === "yes" ? null :
//               (SigningUserType === "admin" ? [
//                 { label: "Client Address", name: "client_address", type: "text" },
//                 { label: "Client Email", name: "client_email", type: "email" },
//                 { label: "Client Contact No", name: "client_contact", type: "number" },
//                 { label: "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of", name: "matter", type: "text" },
//                 { label: "Summary of preliminary advice given to the client", name: "summary", type: "text" },
//                 { label: "Client's Family Name", name: "client_last_name", type: "text" },
//                 { label: "Client's Telephone Number", name: "client_telephone", type: "number" },
//                 { label: "Client's Cellphone Number", name: "client_cellphone", type: "number" },
//                 { label: "Client's Fax Number", name: "client_fax", type: "number" },
//                 { label: "Client File Number", name: "client_file_no", type: "number" },
//                 { label: "Agreement Creation Date", name: "agreement_date", type: "date" },
//                 { label: "Professional Fees", name: "professional_fees", type: "number" },
//                 { label: "Courier charges", name: "courier_charges", type: "number" },
//                 { label: "Administrative Fee", name: "administrative_fee", type: "number" },
//                 { label: "Government fees", name: "government_fees", type: "number" },
//                 { label: "Applicable Taxes", name: "application_fees", type: "number" },
//                 { label: "Balance (Paid at time of filing)", name: "balance", type: "number" },
//                 { label: "Total Cost", name: "total_cost", type: "number" },
//                 { label: "Applicable Retainer Fee for this stage (Non-Refundable) for Step 1", name: "applicable_retainer_fee_stape_1", type: "number" },
//                 { label: "Applicable Government Processing Fee for Step 1", name: "applicable_government_processing_fee_stape_1", type: "number" },
//                 { label: "Applicable Retainer Fee for this stage (Non-Refundable) for Step 2", name: "applicable_retainer_fee_stape_2", type: "number" },
//                 { label: "Total Amount: (Non-Refundable) (Paid at signing of contract and sharing of checklist)", name: "total_amount_signing_of_contract", type: "number" },
//                 { label: "Balance (Non-Refundable) (Paid at time of filing)", name: "balance_paid_at_time_of_filing", type: "number" },
//               ] : [
//                 { label: "Client Address", name: "client_address", type: "text" },
//                 { label: "Client Email", name: "client_email", type: "email" },
//                 { label: "Client Contact No", name: "client_contact", type: "number" },
//                 { label: "The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of", name: "matter", type: "text" },
//                 { label: "Summary of preliminary advice given to the client", name: "summary", type: "text" },
//                 { label: "Client's Family Name", name: "client_last_name", type: "text" },
//                 { label: "Client's Telephone Number", name: "client_telephone", type: "number" },
//                 { label: "Client's Cellphone Number", name: "client_cellphone", type: "number" },
//                 { label: "Client's Fax Number", name: "client_fax", type: "number" },
//               ]).map(({ label, name, type, index }) => (
//                 <div className="form-group col-md-6 mb-0 mt-4" key={index}>
//                   <label htmlFor={name} className="font-size-4 text-black-2 line-height-reset">
//                     {label}
//                   </label>
//                   <input
//                     type={type}
//                     className={`${errors[name] ? "border border-danger" : ""} form-control mx-5 col ${type === "date" ? "coustam_datepicker" : ""}`}
//                     value={state?.[name] || ""}
//                     onKeyDownCapture={type === "date" ? (e) => e.preventDefault() : null}
//                     onChange={onInputChange}
//                     placeholder={label}
//                     id={name}
//                     name={name}
//                   />
//                   {errors[name] && <span className="text-danger font-size-3 mx-5">{errors[name]}</span>}
//                 </div>
//               ))}
//             {/* Render client-specific fields */}
//             {state.family_json.map((client, index) => (
//               <>
//                 <div className="form-group col-md-6 mb-0 mt-4">
//                   <label htmlFor={`client_first_name_${index}`} className="font-size-4 text-black-2 line-height-reset">
//                     Client's First Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control mx-5 col"
//                     value={client.client_first_name}
//                     onChange={(e) => handleClientChange(index, e)}
//                     id={`client_first_name_${index}`}
//                     name="client_first_name"
//                     placeholder="Client's first name"
//                   />
//                 </div>
//                 <div className="form-group col-md-6 mb-0 mt-4">
//                   <label htmlFor={`client_last_name_${index}`} className="font-size-4 text-black-2 line-height-reset">
//                     Client's Last Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control mx-5 col"
//                     value={client.client_last_name}
//                     onChange={(e) => handleClientChange(index, e)}
//                     id={`client_last_name_${index}`}
//                     name="client_last_name"
//                     placeholder="Client's last name"
//                   />
//                 </div>
//                 <div className="form-group col-md-6 mb-0 mt-4">
//                   <label htmlFor={`client_last_name_${index}`} className="font-size-4 text-black-2 line-height-reset">
//                     Client's Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     className="coustam_datepicker form-control mx-5 col"
//                     value={client.client_last_name}
//                     onChange={(e) => handleClientChange(index, e)}
//                     onKeyDownCapture={(e) => e.preventDefault()}
//                     id={`client_date_of_birth_${index}`}
//                     name="client_date_of_birth"
//                     placeholder="Client's DOB"
//                   />
//                 </div>
//                 <div className="form-group col-md-6 mb-0 mt-4">
//                   <SignaturePadComponent
//                     signature={state.family_json[index].client_signature}
//                     onEnd={(signature) => handleSignature(signature, index)}
//                     canvasProps={{ className: 'form-control mx-5 col' }}
//                     setState={setState}
//                     state={state}
//                     index={index}
//                     label={`client_signature`}
//                     name={`Client Signature`}
//                     onSignature={handleSignature}
//                   />
//                 </div>

//                 {index > 0 && (
//                   <div className="col-3 mt-2 d-flex justify-content-end">
//                     <button
//                       type="button"
//                       className="btn btn-danger mb-4"
//                       onClick={() => removeClient(index)}
//                       title='Remove Client'
//                     >
//                       Remove Client
//                     </button>
//                   </div>
//                 )}
//               </>
//             ))}
//             <div className={SigningUserType === "admin" ? "form-group col-md-6 mb-0 mt-4": "d-none" }>
//               <SignaturePadComponent
//                 onEnd={(signature) => handleSignature(signature)}
//                 canvasProps={{ className: 'form-control mx-5 col' }}
//                 setState={setState}
//                 state={state}
//                 label={`rcic_signature`}
//                 name={`RCIC Signature`}
//                 onSignature={handleSignature} />
//             </div>
//             <div className="form-group col-md-6 mb-0 mt-4">
//               <SignaturePadComponent
//                 onEnd={(signature) => handleSignature(signature)}
//                 canvasProps={{ className: 'form-control mx-5 col' }}
//                 setState={setState}
//                 state={state}
//                 label={`initial`}
//                 name={`Initial`}
//                 onSignature={handleSignature} />
//             </div>
//             <div className='d-flex justify-content-center'>
//               <button
//                 type="button"
//                 className="btn btn-info mt-2"
//                 onClick={addClient}
//                 title='Add Client'
//               >
//                 Add more client
//               </button>
//             </div>
//           </div>
//           <div className='text-center d-flex justify-content-center'>
//             <button
//               type="submit"
//               className="btn btn-primary mt-4"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save Agreement"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default Newpdf;
// import React, { useState } from "react";

// const usersList = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Alice Johnson" },
//     { id: 4, name: "Bob Brown" },
// ];

// const Newpdf = () => {
//     const [comment, setComment] = useState("");
//     const [dropdownVisible, setDropdownVisible] = useState(false);
//     const [filteredUsers, setFilteredUsers] = useState(usersList);
//     const [assignedUsers, setAssignedUsers] = useState([]);

//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setComment(value);

//         // Check if the last typed character is '@'
//         const lastChar = value.slice(-1);
//         if (lastChar === "@") {
//             setDropdownVisible(true);
//             setFilteredUsers(usersList);
//         } else {
//             const match = value.match(/@(\w*)$/);
//             if (match) {
//                 const query = match[1].toLowerCase();
//                 const filtered = usersList.filter((user) =>
//                     user.name.toLowerCase().includes(query)
//                 );
//                 setFilteredUsers(filtered);
//             } else {
//                 setDropdownVisible(false);
//             }
//         }
//     };

//     const handleUserSelect = (user) => {
//         // Add the selected user to the assigned list
//         setAssignedUsers((prev) => [...prev, user]);

//         // Replace @username in the comment
//         const updatedComment = comment.replace(/@\w*$/, `@${user.name} `);
//         setComment(updatedComment);

//         // Hide the dropdown and update the filtered users list
//         setDropdownVisible(false);
//         setFilteredUsers((prev) =>
//             prev.filter((u) => u.id !== user.id)
//         );
//     };

//     return (
//         <div style={{ maxWidth: "500px", margin: "0 auto" }}>
//             <textarea
//                 value={comment}
//                 onChange={handleInputChange}
//                 rows={5}
//                 style={{ width: "100%", padding: "10px" }}
//                 placeholder="Type your comment and use @ to mention users..."
//             />

//             {dropdownVisible && filteredUsers.length > 0 && (
//                 <ul
//                     style={{
//                         listStyle: "none",
//                         padding: "0",
//                         margin: "5px 0",
//                         border: "1px solid #ccc",
//                         borderRadius: "4px",
//                         backgroundColor: "#fff",
//                         maxHeight: "150px",
//                         overflowY: "auto",
//                     }}
//                 >
//                     {filteredUsers.map((user) => (
//                         <li
//                             key={user.id}
//                             onClick={() => handleUserSelect(user)}
//                             style={{
//                                 padding: "10px",
//                                 cursor: "pointer",
//                                 borderBottom: "1px solid #eee",
//                             }}
//                         >
//                             {user.name}
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {assignedUsers.length > 0 && (
//                 <div style={{ marginTop: "10px" }}>
//                     <strong>Assigned Users:</strong>
//                     <ul>
//                         {assignedUsers.map((user) => (
//                             <li key={user.id}>{user.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Newpdf;
// import React from "react";

// const activities = [
//     {
//         "id": 2,
//         "activity_id": 2,
//         "week_no": 2,
//         "language": null,
//         "activity": null,
//         "brand": "amit",
//         "who": "amit",
//         "activity_type": "survey",
//         "completion_check": null,
//         "show_completed": false,
//         "location": null,
//         "user_duration": 0,
//         "teamlead_duration": 0,
//         "coach_duration": 0,
//         "coach_type": null,
//         "travel_time": null,
//         "url": null,
//         "amount": null,
//         "file": null,
//         "upload_possible": "no",
//         "activity_description": "desc1",
//         "activity_name": "acc1",
//         "send_reminder": "no",
//         "show_in_task": "no",
//         "add_comment_option": "no",
//         "indicate_when_completed": "no",
//         "is_active": 1,
//         "is_deleted": 0,
//         "created_at": "2025-01-09T11:12:18.070172Z",
//         "updated_at": "2025-01-10T04:18:00.290446Z",
//         "program_id": 1
//     },
//     {
//         "id": 3,
//         "activity_id": null,
//         "week_no": 1,
//         "language": null,
//         "activity": null,
//         "brand": "brand2",
//         "who": null,
//         "activity_type": "survey",
//         "completion_check": null,
//         "show_completed": false,
//         "location": null,
//         "user_duration": 0,
//         "teamlead_duration": 0,
//         "coach_duration": 0,
//         "coach_type": null,
//         "travel_time": null,
//         "url": null,
//         "amount": null,
//         "file": null,
//         "upload_possible": "no",
//         "activity_description": "desc1",
//         "activity_name": "acc2",
//         "send_reminder": "no",
//         "show_in_task": "no",
//         "add_comment_option": "no",
//         "indicate_when_completed": "no",
//         "is_active": 1,
//         "is_deleted": 0,
//         "created_at": "2025-01-10T05:53:41.964815Z",
//         "updated_at": "2025-01-10T05:53:41.964815Z",
//         "program_id": 1
//     },
//     {
//         "id": 4,
//         "activity_id": null,
//         "week_no": 3,
//         "language": null,
//         "activity": null,
//         "brand": "brand3",
//         "who": null,
//         "activity_type": "survey",
//         "completion_check": null,
//         "show_completed": false,
//         "location": null,
//         "user_duration": 0,
//         "teamlead_duration": 0,
//         "coach_duration": 0,
//         "coach_type": null,
//         "travel_time": null,
//         "url": null,
//         "amount": null,
//         "file": null,
//         "upload_possible": "no",
//         "activity_description": "desc1",
//         "activity_name": "acc2",
//         "send_reminder": "no",
//         "show_in_task": "no",
//         "add_comment_option": "no",
//         "indicate_when_completed": "no",
//         "is_active": 1,
//         "is_deleted": 0,
//         "created_at": "2025-01-10T05:53:56.868331Z",
//         "updated_at": "2025-01-10T05:53:56.868331Z",
//         "program_id": 1
//     },
//     {
//         "id": 5,
//         "activity_id": null,
//         "week_no": 1,
//         "language": null,
//         "activity": null,
//         "brand": "brand4",
//         "who": null,
//         "activity_type": "survey",
//         "completion_check": null,
//         "show_completed": false,
//         "location": null,
//         "user_duration": 0,
//         "teamlead_duration": 0,
//         "coach_duration": 0,
//         "coach_type": null,
//         "travel_time": null,
//         "url": null,
//         "amount": null,
//         "file": null,
//         "upload_possible": "no",
//         "activity_description": "desc1",
//         "activity_name": "acc4",
//         "send_reminder": "no",
//         "show_in_task": "no",
//         "add_comment_option": "no",
//         "indicate_when_completed": "no",
//         "is_active": 1,
//         "is_deleted": 0,
//         "created_at": "2025-01-10T05:54:08.476418Z",
//         "updated_at": "2025-01-10T05:54:08.476418Z",
//         "program_id": 1
//     },
//     {
//         "id": 6,
//         "activity_id": null,
//         "week_no": 2,
//         "language": null,
//         "activity": null,
//         "brand": "brand5",
//         "who": null,
//         "activity_type": "survey",
//         "completion_check": null,
//         "show_completed": false,
//         "location": null,
//         "user_duration": 0,
//         "teamlead_duration": 0,
//         "coach_duration": 0,
//         "coach_type": null,
//         "travel_time": null,
//         "url": null,
//         "amount": null,
//         "file": null,
//         "upload_possible": "no",
//         "activity_description": "desc1",
//         "activity_name": "acc5",
//         "send_reminder": "no",
//         "show_in_task": "no",
//         "add_comment_option": "no",
//         "indicate_when_completed": "no",
//         "is_active": 1,
//         "is_deleted": 0,
//         "created_at": "2025-01-10T05:54:22.328012Z",
//         "updated_at": "2025-01-10T05:54:22.328012Z",
//         "program_id": 1
//     }
// ];

// const Newpdf = () => {
//     // Step 1: Group data by week_no
//     // const groupedData = activities.reduce((acc, activity) => {
//     //     const week = activity.week_no;
//     //     if (!acc[week]) {
//     //         acc[week] = [];
//     //     }
//     //     acc[week].push(activity);
//     //     return acc;
//     // }, {});
//     const groupedData = activities.reduce((acc, activity) => {
//         acc[activity.week_no] = acc[activity.week_no] || [];
//         acc[activity.week_no].push(activity);
//         return acc;
//       }, {});
//     // Step 2: Render grouped data
//     return (
//         <div>
//             <h1>Week-wise Activities</h1>
//             {Object.entries(groupedData).map(([week, activities]) => (
//                 <div key={week} style={{ marginBottom: "20px" }}>
//                     <h2>Week {week}</h2>
//                     <ul>
//                         {activities.map((activity) => (
//                             <li key={activity.id}>
//                                 <strong>Activity Name:</strong> {activity.activity_name} <br />
//                                 <strong>Brand:</strong> {activity.brand} <br />
//                                 <strong>Description:</strong> {activity.activity_description} <br />
//                                 <strong>Type:</strong> {activity.activity_type}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Newpdf;
import React, { useState, useRef } from 'react';

const Newpdf = () => {
    const [time, setTime] = useState(10); // Initial value of the timer
    const [isRunning, setIsRunning] = useState(false); // Timer running state
    const timerRef = useRef(null); // Reference for the timer

    // Start the timer
    const startTimer = () => {
        if (!isRunning && time > 0) {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        clearInterval(timerRef.current); // Stop timer when it reaches 0
                        return 0;
                    }
                });
            }, 1000); // Decrement every 1 second
        }
    };

    // Stop the timer
    const stopTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
    };

    // Cleanup on unmount
    React.useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Countdown Timer</h1>
            <h2>{time}</h2>
            <div>
                <button onClick={startTimer} disabled={isRunning}>
                    Start
                </button>
                <button onClick={stopTimer} disabled={!isRunning}>
                    Stop
                </button>
            </div>
        </div>
    );
};

export default Newpdf;

