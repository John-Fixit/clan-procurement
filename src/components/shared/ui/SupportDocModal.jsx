import { Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/react";

const SupportDocModal = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        backdrop: "bg-gray-500/75",
        wrapper: "z-[555555555]",
        base: "bg-transparent shadow-none",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="absolute right-0 top-0 z-10 p-0">
              <button
                type="button"
                className="
                  rounded-md 
                  bg-white 
                  text-gray-400 
                  hover:text-gray-500 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-indigo-500 
                  focus:ring-offset-2
                  p-2
                  m-4
                "
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </ModalHeader>
            <ModalBody className="p-4 sm:p-6">
              <div className="h-80">
                <img
                  className="object-contain object-top w-full h-full"
                  alt="Support Document"
                  src={src}
                />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SupportDocModal;
