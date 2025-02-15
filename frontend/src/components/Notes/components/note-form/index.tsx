import React, { useState } from "react";
import { useFormValidation } from "@hooks/useFormValidation";
import InputField from "@components/ui/input-field";
import Button from "@components/ui/button";
import { useCreateNote } from "@hooks/notes/useNotes";
import "./index.css";
import { useStore } from "@store/useStore";

type NoteFormProps = {
  close: () => void;
};

export default function NoteForm({ close }: NoteFormProps) {
  const { selectedCategory } = useStore();
  const { mutate: createNote } = useCreateNote();
  const { handleSubmit, register, errors } = useFormValidation();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (selectedCategory) {
        const noteData = {
          title: data.title,
          content: data.content || "",
          category_id: selectedCategory,
        };
        await createNote(noteData);
        setIsLoading(false);
        close();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating note", error);
      alert("Error creating note. Please try again.");
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className="note-form-title">Create a new Note</h2>

      <InputField
        type="text"
        name="title"
        register={register}
        errorMessage={errors.title?.message}
      />

      <Button
        label="Create"
        isLoading={isLoading}
        type="submit"
        onClick={null}
      />
    </form>
  );
}
