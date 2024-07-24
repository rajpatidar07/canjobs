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
import { useEffect, useRef } from "react"
import PSPDFKit from "pspdfkit";

export default function Newpdf({document}) {
  const containerRef = useRef(null);
  // let document = "https://canpathways.sharepoint.com/sites/canpathwaysjobs/_layouts/15/download.aspx?UniqueId=d4410fbf-3895-4b2c-80a1-c48948ddf0c4&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJjOTgxNDg4OS00NmIxLTQ1NTgtOWZhOS02NzUyNjJlNTJhYWQiLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBQSFAgcXVpY2sgc3RhcnQiLCJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY2FucGF0aHdheXMuc2hhcmVwb2ludC5jb21ANDYzOTJiN2QtM2ZhNy00Y2M4LWI5ZGQtYjA1YTFkZjllNzQ1IiwiZXhwIjoiMTcyMTc5ODQyMiJ9.CgoKBHNuaWQSAjY0EgsImpW0-77olT0QBRoLMjAuMjAuMzIuOTYqLFVEK24ybk9sbDZXU3d1Rm5pSWlDaGwxeUQ2UTVwRXhFR0RLdVF4M3NneDQ9MJABOAFCEKE_Uk2OgABgFE4h-XWA8lxKEGhhc2hlZHByb29mdG9rZW56ATG6AUBhbGxzaXRlcy53cml0ZSBhbGxmaWxlcy53cml0ZSBhbGxmaWxlcy5yZWFkIGFsbHNpdGVzLmZ1bGxjb250cm9swgFJZDEwMWM4YWQtZTI2My00YzBhLThkYjMtM2JhMmFkMWY4ZWE2QDQ2MzkyYjdkLTNmYTctNGNjOC1iOWRkLWIwNWExZGY5ZTc0NcgBAQ.wSEiu_A4kPGW9Xh_Y1rDvQ4o4QnXHDOl-C9Z6i-DYwA&ApiVersion=2.0";
  useEffect(() => {
    const container = containerRef.current;
    let instance;

    (async function () {
      if (!document) {
        console.error("Document prop is required.");
        return;
      }

      try {
        if (instance) {
          PSPDFKit.unload(container);
        }

        instance = await PSPDFKit.load({
          container,
          license:
            "zFV8P9YHvxGpBc0Tp-W4cg6Fl-zD9VyTWQGiJTi1A0pM18iMZUQDrARKsunUn4oFAuan32RJzCDR--1nglDFAeacyOumrQOdc7aLnh0zkUHLoL9ZIyYS885cFaZySBalYNU4cbnmdUaZUlte0UEfoF8wM-_lJnbFYTYyWvpuPQ7BICRjm9_SGVz9V8bQGEU3OjpqY_YsvjfyRw", // Replace with your actual license key
          document: document,
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
          CommentMarkerAnnotation: true,
          setOnCommentCreationStart: true,
          toolbarItems: PSPDFKit.defaultToolbarItems.concat({
            type: "annotate",
          }),
          // mentionableUsers: props.adminDetailsFOrMention,
          autoSaveMode: PSPDFKit.AutoSaveMode.IMMEDIATE,
          enableRichText: () => true,
          instant: true,
        });
      } catch (error) {
        console.error("Error loading PSPDFKit or document:", error);
      }
    })();

    return () => {
      if (instance) {
        PSPDFKit.unload(container);
      }
    };
  }, [document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
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

