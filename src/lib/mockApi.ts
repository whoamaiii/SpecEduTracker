// This FormValues type is based on the Zod schema in DailyLog.tsx
// Ideally, this type would be shared, perhaps from a dedicated types file
// or by exporting the Zod schema and inferring it here.
export interface FormValues {
  mood: "Glad" | "Trist" | "Rolig" | "Engstelig" | "Sint" | "Nøytral";
  emotions: "Begeistret" | "Frustrert" | "Overveldet" | "Fornøyd" | "Redd" | "Sliten";
  sensoryIssues: "Støy" | "Lys" | "Berøring" | "Lukt" | "Smak" | "Bevegelse";
  notes: string;
  // Adding a timestamp for internal use in the mock API
  timestamp?: string; 
}

const LOGS_STORAGE_KEY = 'dailyLogs';

// Helper function to get logs from localStorage
const getStoredLogs = (): FormValues[] => {
  if (typeof window === 'undefined' || !window.localStorage) {
    // console.warn('LocalStorage is not available. Returning empty array.');
    return [];
  }
  const logsJson = localStorage.getItem(LOGS_STORAGE_KEY);
  try {
    return logsJson ? JSON.parse(logsJson) : [];
  } catch (error) {
    // console.error('Error parsing logs from localStorage:', error);
    return []; // Return empty array if parsing fails
  }
};

// Helper function to save logs to localStorage
const storeLogs = (logs: FormValues[]): void => {
  if (typeof window === 'undefined' || !window.localStorage) {
    // console.warn('LocalStorage is not available. Logs will not be stored.');
    return;
  }
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
};

export const saveLog = (logData: FormValues): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.localStorage) {
      reject(new Error('LocalStorage is not available. Cannot save log.'));
      return;
    }
    try {
      const logs = getStoredLogs();
      // Add a timestamp to the log before saving
      const newLog = { ...logData, timestamp: new Date().toISOString() };
      logs.push(newLog);
      storeLogs(logs);
      resolve();
    } catch (error) {
      // console.error('Failed to save log to localStorage:', error);
      // Reject the promise with the error
      reject(error instanceof Error ? error : new Error('An unknown error occurred while saving the log.'));
    }
  });
};

export const getLogs = (): Promise<FormValues[]> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.localStorage) {
      // Resolve with empty array if localStorage is not available, as per instructions
      resolve([]); 
      return;
    }
    try {
      const logs = getStoredLogs();
      resolve(logs);
    } catch (error) {
      // console.error('Failed to retrieve logs from localStorage:', error);
      reject(error instanceof Error ? error : new Error('An unknown error occurred while retrieving logs.'));
    }
  });
};

export const getLatestLog = (): Promise<FormValues | null> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.localStorage) {
      // Resolve with null if localStorage is not available
      resolve(null);
      return;
    }
    try {
      const logs = getStoredLogs();
      if (logs.length === 0) {
        resolve(null);
      } else {
        // Logs are pushed, so the last one is the latest.
        // If logs had dates for specific days, sorting by date would be more robust.
        resolve(logs[logs.length - 1]);
      }
    } catch (error) {
      // console.error('Failed to retrieve the latest log from localStorage:', error);
      reject(error instanceof Error ? error : new Error('An unknown error occurred while retrieving the latest log.'));
    }
  });
};
