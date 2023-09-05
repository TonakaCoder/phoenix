"use client";

import Modal from "@/app/components/modals/Modal";
import Image from "next/image";

interface ImageModal {
  src?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModal> = ({ src, isOpen, onClose }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80 aspect-auto">
        <Image
          alt="Image"
          src={src}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
