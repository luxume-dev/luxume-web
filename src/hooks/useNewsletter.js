'use client';

import { useState, useCallback } from 'react';
import { subscribeToNewsletter } from '@/services/supabase';

/**
 * Custom hook for newsletter subscription functionality
 * Encapsulates all state and logic for newsletter form
 * 
 * @returns {Object} Newsletter subscription state and handlers
 */
export function useNewsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  /**
   * Validate email format
   * @param {string} emailToValidate - Email to validate
   * @returns {boolean} Whether email is valid
   */
  const validateEmail = useCallback((emailToValidate) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToValidate);
  }, []);

  /**
   * Reset status message
   */
  const resetStatus = useCallback(() => {
    setStatus({ type: '', message: '' });
  }, []);

  /**
   * Handle newsletter subscription
   * @param {Event} e - Form submit event
   */
  const handleSubscribe = useCallback(async (e) => {
    e.preventDefault();

    // Validation
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter your email' });
      return;
    }

    if (!validateEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email' });
      return;
    }

    setIsLoading(true);
    resetStatus();

    const result = await subscribeToNewsletter(email);
    setStatus({ type: result.type, message: result.message });

    if (result.success && result.type === 'success') {
      setEmail('');
    }

    setIsLoading(false);
  }, [email, validateEmail, resetStatus]);

  return {
    // State
    email,
    isLoading,
    status,
    // Actions
    setEmail,
    handleSubscribe,
    resetStatus,
  };
}
