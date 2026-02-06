'use client';

import { useState, useCallback } from 'react';
import { submitContactForm } from '@/services/supabase';

/**
 * Initial form state
 */
const INITIAL_FORM_STATE = {
  full_name: '',
  email_address: '',
  phone_number: '',
  company_name: '',
  subject: '',
  message: '',
};

/**
 * Required fields for validation
 */
const REQUIRED_FIELDS = ['full_name', 'email_address', 'subject', 'message'];

/**
 * Custom hook for contact form functionality
 * Encapsulates all state and logic for contact form
 * 
 * @returns {Object} Contact form state and handlers
 */
export function useContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  /**
   * Handle input field changes
   * @param {Event} e - Change event
   */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setSubmitStatus({ type: '', message: '' });
  }, []);

  /**
   * Reset status message only
   */
  const resetStatus = useCallback(() => {
    setSubmitStatus({ type: '', message: '' });
  }, []);

  /**
   * Validate required fields
   * @returns {boolean} Whether form is valid
   */
  const validateForm = useCallback(() => {
    return REQUIRED_FIELDS.every((field) => formData[field]?.trim());
  }, [formData]);

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: '', message: '' });

    // Validation
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
      setIsLoading(false);
      return;
    }

    const result = await submitContactForm(formData);
    setSubmitStatus({ type: result.type, message: result.message });

    if (result.success) {
      setFormData(INITIAL_FORM_STATE);
    }

    setIsLoading(false);
  }, [formData, validateForm]);

  return {
    // State
    formData,
    isLoading,
    submitStatus,
    // Actions
    handleChange,
    handleSubmit,
    resetForm,
    resetStatus,
  };
}
