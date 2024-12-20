import React from "react";
import Modal from "react-modal";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

Modal.setAppElement("#__next");

const ReusableModal: React.FC<ReusableModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
                {/* Sticky Header */}
                <div className="flex justify-between items-center bg-white sticky top-0 px-6 py-4 border-b z-10">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:text-red-700 focus:outline-none text-2xl"
                    >
                        ✕
                    </button>
                </div>
                {/* Modal Content */}
                <div className="p-6">{children}</div>
            </div>
        </div>
  );
};

export default ReusableModal;
