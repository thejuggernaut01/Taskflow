import { toast } from 'react-toastify';

export const toastError = (message: string) => {
  return toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
