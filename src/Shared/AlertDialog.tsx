import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

function CustomAletDialog({isOpen , onOpen , onClose ,title , description , cancelTxt ="Cancel" , okTxt ="Ok" , onOkHandler ,isLoading} : {
    isOpen :  boolean ,
    onOpen : ()=> void,
    onClose : ()=> void,
    title : string,
    description : string,
    cancelTxt : string , 
    okTxt : string
    onOkHandler : ()=> void
    isLoading: boolean
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={()=>onOpen}>Discard</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as React.RefObject<HTMLButtonElement>}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {description}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={()=> onClose}>
              {cancelTxt}
            </Button>
            <Button colorScheme="red" ml={3} onClick={onOkHandler} isLoading={isLoading} >
              {okTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CustomAletDialog;
