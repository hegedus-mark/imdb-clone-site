import { createContext } from "react";
import { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastId = useRef(null);

  const showToast = (message, options) => {
    toast(message, options);
  };

  const showSuccessToast = (message, options) => {
    toast.success(message, options);
  };

  const showErrorToast = (message, options) => {
    toast.error(message, options);
  };

  const showInfoToast = (message, options) => {
    toast.info(message, options);
  };

  const showWarningToast = (message, options) => {
    toast.warn(message, options);
  };

  const showPromiseToast = (promise, messages) => {
    toast.promise(promise, messages);
  };

  const showLoadingToast = (message, options) => {
    toastId.current = toast.loading(message, options);
  };

  const updateToast = (message, type, options) => {
    toast.update(toastId.current, {
      render: message,
      type: type,
      ...options,
    });
  };

  const value = {
    showToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
    showPromiseToast,
    showLoadingToast,
    updateToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ToastContext.Provider>
  );
};
