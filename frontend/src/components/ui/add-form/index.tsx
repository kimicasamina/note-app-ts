import React, { useState } from "react";
import { useFormValidation } from "@hooks/useFormValidation";
import InputField from "../input-field";
import Button from "../button";

type AddFormProps = {
  title: string;
};

export default function AddForm({ title }: AddFormProps) {
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
      <InputField
        label="Note Title"
        type="text"
        name="title"
        register={register}
        errorMessage={errors.title?.message}
      />

      <InputField
        label="Category"
        type="text"
        name="category"
        register={register}
        errorMessage={errors.category?.message}
      />

      <Button
        label="Create Note"
        isLoading={isLoading}
        type="submit"
        onClick={null}
      />
    </form>
  );
}
