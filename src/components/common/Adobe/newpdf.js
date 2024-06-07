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
import React, { useState, useEffect } from 'react';

const Newpdf = () => {
  const [data, setData] = useState({});
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({ country: '', state: '', city: '', selectedCountry: '', selectedState: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('countryStateCityData');
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem('countryStateCityData', JSON.stringify(newData));
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const { country, state, city, selectedCountry, selectedState } = form;

    let newData = {...data };
    if (type === 'country') newData[country] = {};
    if (type === 'state') newData[selectedCountry][state] = [];
    if (type === 'city') newData[selectedCountry][selectedState].push(city);

    saveData(newData);
    setForm({...form, [type]: '' });

    let newProgress = progress;
    if (type === 'country') newProgress += 40;
    else newProgress += 30;
    setProgress(newProgress > 100? 100 : newProgress);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Country, State, City</h1>

      <form onSubmit={(e) => handleSubmit(e, 'country')}>
        <input name="country" value={form.country} onChange={handleChange} placeholder="Add Country" required />
        <button type="submit">Add Country</button>
      </form>

      <form onSubmit={(e) => handleSubmit(e, 'tate')}>
        <select name="selectedCountry" value={form.selectedCountry} onChange={handleChange} required>
          <option value="" disabled>Select Country</option>
          {Object.keys(data).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <input name="state" value={form.state} onChange={handleChange} placeholder="Add State" required />
        <button type="submit">Add State</button>
      </form>

      <form onSubmit={(e) => handleSubmit(e, 'city')}>
        <select name="selectedCountry" value={form.selectedCountry} onChange={handleChange} required>
          <option value="" disabled>Select Country</option>
          {Object.keys(data).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select name="selectedState" value={form.selectedState} onChange={handleChange} required>
          <option value="" disabled>Select State</option>
          {form.selectedCountry && Object.keys(data[form.selectedCountry] || {}).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <input name="city" value={form.city} onChange={handleChange} placeholder="Add City" required />
        <button type="submit">Add City</button>
      </form>

      <div>
        <h2>Data:</h2>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <h2>Progress</h2>
        {progress}%
      </div>
      <div className="progress" style={{ height: "20px" }}>
        <div className="progress-bar" role="progressbar" aria-label="Example 20px high" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  );
};

export default Newpdf;

