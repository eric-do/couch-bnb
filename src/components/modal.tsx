import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: Props) {
  return (
    <>
      <div className="w-screen h-screen bg-black fixed top-0 z-overlay opacity-50">
      </div>
      <div className="absolute inset-0 h-screen flex justify-center items-center z-modal">
        <div className="bg-white p-5 rounded-2xl">
          <div className="flex justify-end">
            <button>
              <FaTimes size={20} onClick={onClose} className="text-gray-600" />
            </button>
          </div>
          <div className="p-3">
            { children }
          </div>
        </div>
      </div>
    </>
  );
}
