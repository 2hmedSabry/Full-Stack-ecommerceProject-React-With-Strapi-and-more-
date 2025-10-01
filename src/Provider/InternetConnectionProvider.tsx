import { useToast, type ToastId } from "@chakra-ui/react";
import { useEffect, useRef, type ReactNode } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useAppDispatch } from "../app/store";
import { networkMode } from "../app/features/networkSlice";

const InternetConnectionProvider = ({ children }: { children?: ReactNode }) => {
  const dispatch = useAppDispatch()
  const toast = useToast();
  const toastIdRef = useRef<ToastId | null>(null);

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  function addToast() {
    toastIdRef.current = toast({
      title: "You're offline",
      description: "Please make sure you have interent connection",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  }

  const setOnline = ()=>{
    dispatch(networkMode(true))
    close();

    
  }
  const setOffline =()=>{
    dispatch(networkMode(false))
    addToast()
    
  }


  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return ()=>{
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)

    }

  }, []);



  return children
};

export default InternetConnectionProvider;
