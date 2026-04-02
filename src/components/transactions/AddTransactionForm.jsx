import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../../store/slices/transactionSlice';
import { TRANSACTION_CATEGORIES, TRANSACTION_TYPES } from '../../constants/transactionCategories';
import { validateTransactionForm } from '../../utils/formValidation';
import '../../styles/form.css';

/**
 * AddTransactionForm Component
 * 
 * Allows users to add new income or expense transactions.
 * Features:
 * - Expandable form interface
 * - Form validation with inline error messages
 * - Real-time error clearing as user types
 * - Redux integration for state persistence
 */
export default function AddTransactionForm({
  transaction = null,
  triggerLabel = '+ Add Transaction',
  triggerClassName = 'floating-add-button',
  triggerAriaLabel,
  triggerTitle,
}) {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const isEditMode = Boolean(transaction);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData(transaction));
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  /**
   * Returns initial form state with current values when editing
   */
  function getInitialFormData(currentTransaction = null) {
    return {
      date: currentTransaction?.date || new Date().toISOString().split('T')[0],
      category: currentTransaction?.category || '',
      amount: currentTransaction ? String(currentTransaction.amount) : '',
      type: currentTransaction?.type || 'expense',
    };
  }

  /**
   * Handles input changes and clears validation errors for that field
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Handles form submission - validates and dispatches action
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');

    // Validate form
    const newErrors = validateTransactionForm(formData);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const baseTransaction = {
        date: formData.date,
        category: formData.category,
        amount: parseFloat(formData.amount),
        type: formData.type,
      };

      if (isEditMode) {
        dispatch(
          updateTransaction({
            ...transaction,
            ...baseTransaction,
          })
        );
      } else {
        dispatch(
          addTransaction({
            id: Math.max(...transactions.map((t) => t.id), 0) + 1,
            ...baseTransaction,
          })
        );
      }

      // Reset form and close
      resetForm();
    } catch {
      setSubmitError(
        isEditMode
          ? 'Failed to update transaction. Please try again.'
          : 'Failed to add transaction. Please try again.'
      );
    }
  };

  /**
   * Resets form to initial state and closes
   */
  const resetForm = () => {
    setFormData(getInitialFormData(transaction));
    setErrors({});
    setSubmitError('');
    setIsOpen(false);
  };

  /**
   * Cancels form and closes without saving
   */
  const handleCancel = () => {
    resetForm();
  };

  const handleOpen = () => {
    setFormData(getInitialFormData(transaction));
    setErrors({});
    setSubmitError('');
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={handleOpen}
        className={triggerClassName}
        aria-label={triggerAriaLabel || (isEditMode ? 'Edit transaction' : 'Add new transaction')}
        title={triggerTitle || (isEditMode ? 'Edit transaction' : 'Add new transaction')}
      >
        {triggerLabel}
      </button>

      {/* Modal Overlay and Form */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => handleCancel()}>
          <form
            onSubmit={handleSubmit}
            className="modal-form"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="form-title">
              {isEditMode ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>

            {submitError && <p className="form-error">{submitError}</p>}

            {/* Date Field */}
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Date <span className="required">*</span>
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`form-input ${errors.date ? 'input-error' : ''}`}
                aria-invalid={!!errors.date}
              />
              {errors.date && <p className="field-error">{errors.date}</p>}
            </div>

            {/* Category Field */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category <span className="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`form-select ${errors.category ? 'input-error' : ''}`}
                aria-invalid={!!errors.category}
              >
                <option value="">Select a category</option>
                {TRANSACTION_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="field-error">{errors.category}</p>}
            </div>

            {/* Amount Field */}
            <div className="form-group">
              <label htmlFor="amount" className="form-label">
                Amount <span className="required">*</span>
              </label>
              <input
                id="amount"
                type="number"
                name="amount"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
                className={`form-input ${errors.amount ? 'input-error' : ''}`}
                aria-invalid={!!errors.amount}
              />
              {errors.amount && <p className="field-error">{errors.amount}</p>}
            </div>

            {/* Type Field */}
            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Type <span className="required">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="form-select"
              >
                {TRANSACTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="submit" className="submit-button">
                {isEditMode ? 'Save Changes' : 'Add Transaction'}
              </button>
              <button type="button" onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
