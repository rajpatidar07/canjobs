import React, { useState } from "react";

const PasswordInput = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    /*Function to show hide password */
    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const renderIcon = () => {
        if (props.value.length > 0) {
            return showPassword ? (
                <i className="fa fa-eye-slash" title="Hide password"></i>
            ) : (
                <i className="fa fa-eye" title="Show password"></i>
            );
        }
        return null;
    };

    return (
        <div className="position-relative">
            <input
                type={showPassword ? "text" : "password"}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                style={{ paddingRight: "2rem", width: "100%" }}
                className={props.className}
                name={props.name}
                id={props.id}
            />
            <span className="password-icon" onClick={toggleShowPassword}>
                {renderIcon()}
            </span>
        </div>
    );
};

export default PasswordInput;
