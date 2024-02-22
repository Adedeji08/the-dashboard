// Toast.tsx
import React from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {}

const Toast: React.FC<ToastProps> = () => {
  const defaultOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  };

  const containerStyle = {
    marginTop: '60px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '2px',
    border: '2px',
  };

  return (
    <>
      <ToastContainer {...defaultOptions} style={containerStyle} className="toast-message-container" />
    </>
  );
};

export const showToast = (
    message: string | undefined,
    status: boolean,
    options?: ToastOptions
  ) => {
    const defaultSuccessMessage = 'Operation successful';
    const defaultErrorMessage = 'Operation failed'; 
  
    const toastOptions: ToastOptions = {
      className: status ? 'toast-success' : 'toast-error',
      ...options,
    };
  
    toast(message || (status ? defaultSuccessMessage : defaultErrorMessage), toastOptions);
  };

export default Toast;
