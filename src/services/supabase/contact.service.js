import { supabase } from '@/lib/supabase';

/**
 * Contact Service
 * Handles all contact form Supabase operations
 */

/**
 * Submit contact form data to the database
 * @param {Object} formData - The contact form data
 * @param {string} formData.full_name - Full name (required)
 * @param {string} formData.email_address - Email address (required)
 * @param {string} formData.phone_number - Phone number (optional)
 * @param {string} formData.company_name - Company name (optional)
 * @param {string} formData.subject - Subject (required)
 * @param {string} formData.message - Message (required)
 * @returns {Promise<{success: boolean, message: string, type: 'success' | 'error'}>}
 */
export async function submitContactForm(formData) {
  try {
    const { error } = await supabase.from('contact_us').insert([
      {
        full_name: formData.full_name,
        email_address: formData.email_address,
        phone_number: formData.phone_number || null,
        company_name: formData.company_name || null,
        subject: formData.subject,
        message: formData.message,
      },
    ]);

    if (error) throw error;

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      type: 'success',
    };
  } catch (error) {
    console.error('[Contact Service] Error submitting form:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
      type: 'error',
    };
  }
}
