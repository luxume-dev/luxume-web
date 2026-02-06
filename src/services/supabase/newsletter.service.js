import { supabase } from '@/lib/supabase';

/**
 * Newsletter Service
 * Handles all newsletter-related Supabase operations
 */

/**
 * Subscribe an email to the newsletter
 * @param {string} email - The email address to subscribe
 * @returns {Promise<{success: boolean, message: string, type: 'success' | 'info' | 'error'}>}
 */
export async function subscribeToNewsletter(email) {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (error) {
      // Handle duplicate email (unique constraint violation)
      if (error.code === '23505') {
        return {
          success: true,
          message: 'You are already subscribed!',
          type: 'info',
        };
      }
      throw error;
    }

    return {
      success: true,
      message: 'Successfully subscribed!',
      type: 'success',
    };
  } catch (error) {
    console.error('[Newsletter Service] Error subscribing:', error);
    return {
      success: false,
      message: 'Something went wrong. Try again.',
      type: 'error',
    };
  }
}
