import { useContext } from "react";
import { ToastContext } from "../Components/contexts/ToastContext/ToastContext";

export const useToast = () => {
  return useContext(ToastContext);
};