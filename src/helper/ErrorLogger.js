import { addMessage } from '../components/Notifier';

const ErrorLogger = {
  log: (error, message) => {
    addMessage({ message });
  },
};

export default ErrorLogger;
