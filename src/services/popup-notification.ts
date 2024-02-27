import { AlertStatus, createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

let currentToast: any = null;

const popupNotification = (title: string, description: string, status: AlertStatus, color: string) => {
  if (currentToast) {
    toast.close(currentToast);
  }

  currentToast = toast({
    title,
    description,
    status,
    colorScheme: color,
    isClosable: true,
    duration: 4 * 1000,
    position: 'top',
  });
};

export const successNotification = (title: string, description: string) => {
  popupNotification(title, description, 'success', 'gray');
};

export const errorNotification = (title: string, description: string | any) => {
  if (typeof description === 'string') {
    popupNotification(title, description, 'error', 'red');
  } else if (description.data && description.data.message) {
    popupNotification(title, description.data.message, 'error', 'red');
  } else {
    errorNotification("Unable to establish a connection", "Please ensure you have an active internet connection and try again.");
  }
};
