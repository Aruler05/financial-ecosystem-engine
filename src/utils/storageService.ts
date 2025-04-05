
/**
 * Storage service for managing data persistence in the application
 * This handles saving and loading data from localStorage/AsyncStorage
 */

// Storage keys for different data types
export const STORAGE_KEYS = {
  BILLS_UPCOMING: 'finance_app_upcoming_bills',
  BILLS_RECURRING: 'finance_app_recurring_bills',
  BILLS_SUMMARY: 'finance_app_bills_summary',
  EXPENSES: 'finance_app_expenses',
  INCOME: 'finance_app_income',
  INVESTMENTS: 'finance_app_investments',
  BUDGET: 'finance_app_budget',
  SAVINGS: 'finance_app_savings',
  DEBT: 'finance_app_debt',
  LOANS: 'finance_app_loans',
  SETTINGS: 'finance_app_settings',
  USER_PROFILE: 'finance_app_user_profile'
};

/**
 * Save data to storage
 * @param key The storage key
 * @param data The data to store
 */
export const saveData = <T>(key: string, data: T): void => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    console.log(`Data saved successfully for key: ${key}`);
  } catch (error) {
    console.error(`Error saving data for key: ${key}`, error);
  }
};

/**
 * Load data from storage
 * @param key The storage key
 * @param defaultValue Default value if no data is found
 * @returns The loaded data or default value
 */
export const loadData = <T>(key: string, defaultValue: T): T => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) {
      return defaultValue;
    }
    return JSON.parse(jsonData) as T;
  } catch (error) {
    console.error(`Error loading data for key: ${key}`, error);
    return defaultValue;
  }
};

/**
 * Clear data for a specific key
 * @param key The storage key to clear
 */
export const clearData = (key: string): void => {
  try {
    localStorage.removeItem(key);
    console.log(`Data cleared for key: ${key}`);
  } catch (error) {
    console.error(`Error clearing data for key: ${key}`, error);
  }
};

/**
 * Clear all app data
 */
export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('All app data cleared');
  } catch (error) {
    console.error('Error clearing all app data', error);
  }
};

/**
 * Export all app data as JSON file
 * @returns JSON string of all app data
 */
export const exportAllData = (): string => {
  try {
    const exportData: Record<string, any> = {};
    
    Object.entries(STORAGE_KEYS).forEach(([category, key]) => {
      const data = localStorage.getItem(key);
      if (data) {
        exportData[category] = JSON.parse(data);
      }
    });
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting app data', error);
    return JSON.stringify({ error: 'Failed to export data' });
  }
};

/**
 * Import data from JSON
 * @param jsonData JSON string to import
 * @returns Success status
 */
export const importData = (jsonData: string): boolean => {
  try {
    const importedData = JSON.parse(jsonData);
    
    Object.entries(importedData).forEach(([category, data]) => {
      const key = STORAGE_KEYS[category as keyof typeof STORAGE_KEYS];
      if (key) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error importing data', error);
    return false;
  }
};
