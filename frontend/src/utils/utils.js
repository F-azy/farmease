// src/utils/utils.js

/**
 * Get a value from localStorage
 * @param {string} key - The key to retrieve
 * @param {boolean} parse - Whether to parse the value as JSON
 * @returns {any} The stored value or null if not found
 */
export const getValue = (key, parse = false) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
      return parse ? JSON.parse(value) : value;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  };
  
  /**
   * Set a value in localStorage
   * @param {string} key - The key to set
   * @param {any} value - The value to store
   * @param {boolean} stringify - Whether to stringify the value
   * @returns {boolean} Success status
   */
  export const setValue = (key, value, stringify = false) => {
    try {
      const valueToStore = stringify ? JSON.stringify(value) : value;
      localStorage.setItem(key, valueToStore);
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  };
  
  /**
   * Remove a value from localStorage
   * @param {string} key - The key to remove
   * @returns {boolean} Success status
   */
  export const removeValue = (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  };
  
  /**
   * Clear all values from localStorage
   * @returns {boolean} Success status
   */
  export const clearStorage = () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  };
  
  /**
   * Format a date string to a readable format
   * @param {string} dateString - The date string to format
   * @param {object} options - Intl.DateTimeFormat options
   * @returns {string} Formatted date string
   */
  export const formatDate = (dateString, options = {}) => {
    try {
      const date = new Date(dateString);
      const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
      };
      return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };
  
  /**
   * Format currency amount
   * @param {number} amount - The amount to format
   * @param {string} currency - Currency code (default: USD)
   * @returns {string} Formatted currency string
   */
  export const formatCurrency = (amount, currency = 'USD') => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `${currency} ${amount}`;
    }
  };
  
  /**
   * Truncate text to a specific length
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength).trim()}...`;
  };
  
  /**
   * Debounce function to limit how often a function can be called
   * @param {Function} func - The function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  export const debounce = (func, wait = 300) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  
  /**
   * Validate email format
   * @param {string} email - The email to validate
   * @returns {boolean} Whether the email is valid
   */
  export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  /**
   * Generate a random ID
   * @param {number} length - Length of the ID
   * @returns {string} Random ID
   */
  export const generateId = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };