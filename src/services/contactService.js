import { supabase } from '../lib/supabase.js';

export const contactService = {
  /**
   * Submits a new contact message
   * @param {Object} contactData 
   * @param {string|null} userId 
   */
  async submitContactMessage(contactData, userId = null) {
    if (!supabase) {
      return { error: { message: 'Supabase is not configured. Please connect your database.' } };
    }

    try {
      // 1. Insert into database
      const { data: messageRecord, error: dbError } = await supabase
        .from('contact_messages')
        .insert([{
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone || null,
          subject: contactData.subject,
          message: contactData.message,
          user_id: userId
        }])
        .select()
        .single();

      if (dbError) {
        console.error('Database insertion error:', dbError);
        return { error: { message: 'Unable to send your message right now. Please try again.' } };
      }

      // 2. Trigger the edge function to send the email
      const { data: edgeData, error: edgeError } = await supabase.functions.invoke('send-contact-message', {
        body: { messageId: messageRecord.id }
      });

      if (edgeError || (edgeData && !edgeData.success)) {
        console.error('Edge function error:', edgeError || edgeData?.error);
        return { 
          data: messageRecord, 
          emailFailed: true,
          error: { message: 'Your message was securely saved in our database, but we are experiencing delays with our email notifications.' } 
        };
      }

      return { data: messageRecord, emailFailed: false };
    } catch (err) {
      console.error('Unexpected contact submission error:', err);
      return { error: { message: 'An unexpected error occurred. Please try again.' } };
    }
  }
};
