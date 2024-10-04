import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import filterjson from '../json/filterjson';

export default function ContactNoWithCountryCode({onInputChange,feildError,name,value,id}) {
    const [countryCode, setCountryCode] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); 
    const handleSpanClick = () => {
      setShowDropdown(true);
    };
  
    const handleCountryCodeChange = ( code) => {
      setCountryCode(code);
      setShowDropdown(false); // Close dropdown after selection
    };
  return (
    <div className="input-group"> 
    {/* Country Code Selector */}
    <span
      style={{
        cursor: 'pointer',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: '#f1f1f1',
        padding: '0.5rem',
      }}
      onClick={handleSpanClick} // Open/close the dropdown on click
    >
      {countryCode || 'Code'}
    </span>

    {/* Country Dropdown (visible when span is clicked) */}
    {showDropdown && (
      <ul className="dropdown-menu show" style={{ position: 'absolute', top: '100%', left: 0 }}>
        {(filterjson.location || []).map((item, index) => (
          <li key={index}>
            <Link
              to=""
              className="dropdown-item text-dark"
              onClick={(e) => {
                e.preventDefault();
                handleCountryCodeChange(item.code);
              }}
            >
              {item.country} ({item.code})
            </Link>
          </li>
        ))}
      </ul>
    )}
    <input
      type="tel"
      min={0}
      placeholder="Mobile Number"
      name={name}
      value={value || ""}
      onChange={onInputChange}
      className={
        feildError
          ? "form-control border border-danger"
          : "form-control"
      }
      id={id}
      maxLength={13}
      style={{ marginLeft: '5px', flex: 1 }} // Allow input to take available space
    />
    {/* Country Code Display */}
  </div>  )
}
