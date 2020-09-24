import React, { useRef } from "react";
import { useFocusInput } from "../lib";
export const TextInput = ({
  shouldFocus,
  label,
  value,
  inputId,
  handler,
  name = "",
}) => {
  const ref = useRef();
  useFocusInput(ref, shouldFocus, inputId);
  if (value === undefined) return null;
  return (
    <>
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
      <input
        ref={ref}
        id={name}
        type="text"
        name={name}
        value={value}
        onChange={handler}
      />
    </>
  );
};

export const SelectEnum = ({
  label,
  value,
  handler,
  name = "",
  options = [],
}) => {
  return (
    <label htmlFor={name}>
      <span>{label}</span>
      <select name={name} id={name} value={value} onChange={handler}>
        <option key="default">choose type</option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </label>
  );
};
