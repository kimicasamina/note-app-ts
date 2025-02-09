// useFormValidation.ts
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  category: string;
}

export const useFormValidation = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted", data);
    // You can handle form submission (e.g., make API call or save data)
  };

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
  };
};
