/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function useValidation(initialState, validators) {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    Object.keys(state).forEach((key) => {
      const value = state[key];

      const fieldErrors = validators[key].reduce((acc, validator) => {
        const error = validator(value);
        if (error) {
          acc.push(error);
        }
        return acc;
      }, []);

      if (fieldErrors.length > 0) {
        newErrors[key] = fieldErrors;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    state,
    onInputChange,
    errors,
    validate,
  };
}

export default useValidation;
