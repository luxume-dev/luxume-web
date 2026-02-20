import { supabase } from '@/lib/supabase';

/**
 * Submit a quote request to the database
 */
export async function submitQuoteRequest(formData) {
  try {
    const { error } = await supabase.from('quote_requests').insert([
      {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        product_name: formData.product_name || null,
        profile_type: formData.profile_type || null,
        message: formData.message || null,
      },
    ]);

    if (error) throw error;

    return {
      success: true,
      message: "Quote request sent! We'll be in touch soon.",
      type: 'success',
    };
  } catch (error) {
    console.error('[Quotes Service] Error submitting quote:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
      type: 'error',
    };
  }
}
