import { ApiResponse } from '@/types/auth';
import { toastError } from '@/utils';
import { toast } from 'sonner';

const handleAsyncErrors = async (error: unknown) => {
  const castedError = error as ApiResponse;
  console.log('Error', castedError);

  if (castedError.message === 'Network Error') {
    toastError(castedError.message);
    return;
  }

  const errorMessage = castedError.response?.data.message;

  // when error message is an array
  // display first error in the array
  if (typeof errorMessage === 'object') {
    toast.error('Error', {
      description: castedError.response?.data.message[0],
    });
    return;
  }

  // when error message is a string
  toast.error('Error', {
    description: castedError.response?.data.message,
  });
  return;
};

export default handleAsyncErrors;
