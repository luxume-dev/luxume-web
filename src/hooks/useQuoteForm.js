'use client';

import { useState, useCallback } from 'react';
import { submitQuoteRequest } from '@/services/supabase';

const INITIAL_STATE = {
  full_name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

export function useQuoteForm({ productName, profileType }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_STATE);
    setSubmitStatus({ type: '', message: '' });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    if (!formData.full_name.trim() || !formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Full name and email are required.' });
      return;
    }

    setIsLoading(true);
    const result = await submitQuoteRequest({
      ...formData,
      product_name: productName,
      profile_type: profileType,
    });
    setSubmitStatus({ type: result.type, message: result.message });
    if (result.success) setFormData(INITIAL_STATE);
    setIsLoading(false);
  }, [formData, productName, profileType]);

  return { formData, isLoading, submitStatus, handleChange, handleSubmit, resetForm };
}
