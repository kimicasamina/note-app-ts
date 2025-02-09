import React, { ReactNode } from "react";
import "./index.css";
interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal only if the click happened outside the modal content
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-container" onClick={handleCloseModal}>
      <div className="modal">{children}</div>
    </div>
  );
}
