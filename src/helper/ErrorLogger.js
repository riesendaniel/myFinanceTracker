import { addMessage } from '../components/Notifier';

const ErrorLogger = {
  log: (error, message) => {
    addMessage({ message });
    console.error(error);
  },
};

export default ErrorLogger;
