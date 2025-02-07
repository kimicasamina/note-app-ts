import React from "react";
import "./index.css";

interface InputFieldProps {
  label: string;
  type: string;
  errorMessage?: string | any;
  register: any; // React Hook Form's register function will be passed here
  name: string; // Added 'name' to identify the field
}

export default function InputField({
  label,
  type,
  errorMessage,
  register,
  name,
}: InputFieldProps) {
  return (
    <div className="inputField">
      <label className="inputField__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="inputField__input"
        type={type}
        id={name}
        {...register(name)}
      />
      {errorMessage && (
        <p className="inputField__error" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
