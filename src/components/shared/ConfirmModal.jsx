import { Modal } from "@heroui/react";
import React from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  //   description,
  //   action,
  //   cancel,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <ModalContent>{() => <></>}</ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
