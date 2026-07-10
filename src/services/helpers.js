// Format currency
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Format date
export const formatDate = (date, locale = "en-US") => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const parseMultilingualCurrency = (currencyString) => {
  if (!currencyString) return 0;

  // Convert Eastern Arabic numerals (٠١٢٣٤٥٦٧٨٩) to Western (0123456789)
  const easternToWestern = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  let convertedString = currencyString.toString();

  // Replace Eastern Arabic numerals
  convertedString = convertedString.replace(
    /[٠١٢٣٤٥٦٧٨٩]/g,
    (match) => easternToWestern[match]
  );

  // Remove currency symbols and commas
  const cleanString = convertedString.replace(/[$,£€¥ر.ق\s]/g, "");

  return parseFloat(cleanString) || 0;
};

// Calculate total price
export const calculateTotal = (travelers, basePrice, taxRate = 0.1) => {
  const price = parseMultilingualCurrency(basePrice);
  const subtotal = price * travelers;
  const tax = subtotal * taxRate;
  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
};

export const convertWstToEst = (westernString) => {
  if (!westernString) return;
  const str = westernString.toString();
  const westernToEastern = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  return str.replace(/[0-9]/g, (match) => westernToEastern[match]);
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number (basic)
export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-()]{10,}$/;
  return re.test(phone);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
};
