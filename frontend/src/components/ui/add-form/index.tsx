// AddForm.tsx
import React, { useState } from "react";
import { useFormValidation } from "@hooks/useFormValidation";
import InputField from "../input-field";
import Button from "../button";
import { FormData } from "types/types";

type InputFieldType = {
  label: string;
  type: string;
  name: keyof FormData; // Ensure name is a valid key of FormData
};

type AddFormProps = {
  title: string;
  inputs: InputFieldType[]; // Accept a list of input field definitions
};

export default function AddForm({ title, inputs }: AddFormProps) {
  const { handleSubmit, register, errors, onSubmit } = useFormValidation();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (data: any) => {
    setIsLoading(true);
    onSubmit(data);
    setTimeout(() => {
      setIsLoading(false);
      alert("Note Created Successfully!");
    }, 2000);
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className="form-title">Add new {title}</h2>

      {/* Iterate over the inputs array and render InputField dynamically */}
      {inputs.map((input, index) => (
        <InputField
          key={index}
          label={input.label}
          type={input.type}
          name={input.name}
          register={register}
          errorMessage={errors[input.name as keyof FormData]?.message || ""}
        />
      ))}

      <Button
        label="Create Note"
        isLoading={isLoading}
        type="submit"
        onClick={null}
      />
    </form>
  );
}
