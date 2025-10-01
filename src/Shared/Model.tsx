import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import type {  ReactNode } from "react";

interface ICustomModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  cancelTxt?: string;
  okTxt?: string;
  children?: ReactNode;
  isLoading : boolean,
  onOKClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomModel = ({
  isOpen,
  onClose,
  title,
  cancelTxt = "Cancel",
  okTxt = "Done",
  children,
  isLoading,
  onOKClick,
}: ICustomModelProps) => {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg={"blackAlpha.500"}
          backdropFilter="blur(5px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                {cancelTxt}
              </Button>
              <Button colorScheme="blue"  onClick={onOKClick}
              isLoading={isLoading}
              >
                {okTxt}
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModel;
