/**
 * Form Validation Utilities
 * 
 * Reusable validation logic for transaction forms.
 * Keeps validation rules in a single place for consistency.
 */

/**
 * Validates transaction form data
 * @param {Object} formData - Form data to validate
 * @param {string} formData.date - Transaction date (YYYY-MM-DD)
 * @param {string} formData.category - Transaction category
 * @param {string|number} formData.amount - Transaction amount
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateTransactionForm = (formData) => {
  const errors = {};

  // Validate date
  if (!formData.date) {
    errors.date = 'Date is required';
  }

  // Validate category
  if (!formData.category) {
    errors.category = 'Category is required';
  }

  // Validate amount
  if (!formData.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(formData.amount)) {
    errors.amount = 'Amount must be a number';
  } else if (parseFloat(formData.amount) <= 0) {
    errors.amount = 'Amount must be greater than zero';
  }

  return errors;
};

/**
 * Checks if form validation passed (no errors)
 * @param {Object} errors - Validation errors object
 * @returns {boolean} True if no errors, false otherwise
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
