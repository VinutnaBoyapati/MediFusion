// Importing types for performance entries
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Define the type for the callback function
type OnPerfEntry = (metric: any) => void;

const reportWebVitals = (onPerfEntry?: OnPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Import the web-vitals library and call the functions with the onPerfEntry callback
    import('web-vitals').then(() => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
