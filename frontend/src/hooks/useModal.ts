import React, { useState } from "react";

// Define the return type of the useModal hook
interface ModalActions {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

// Custom hook for handling modal state
export default function useModal(): ModalActions {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };
}
