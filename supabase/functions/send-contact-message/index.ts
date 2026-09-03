import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messageId } = await req.json()
    if (!messageId) {
      throw new Error('Message ID is required')
    }

    // Initialize Supabase Client with Service Role Key
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch the contact message
    const { data: message, error: fetchError } = await supabaseClient
      .from('contact_messages')
      .select('*')
      .eq('id', messageId)
      .single()

    if (fetchError || !message) {
      console.error('Error fetching message:', fetchError)
      throw new Error('Contact message not found')
    }

    // Prepare email payload
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const receivingEmail = Deno.env.get('CONTACT_RECEIVING_EMAIL')
    const fromEmail = Deno.env.get('CONTACT_FROM_EMAIL')

    if (!resendApiKey || !receivingEmail || !fromEmail) {
      throw new Error('Email configuration secrets are missing')
    }

    const emailSubject = `New Travel Website Inquiry — ${message.subject}`
    
    // Formatting date
    const submittedDate = new Date(message.created_at).toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    })

    const visitorType = message.user_id ? `Authenticated User (ID: ${message.user_id})` : 'Guest Visitor'

    const emailBody = `
New Contact Form Submission

--------------------------------

Name:
${message.name}

Email:
${message.email}

Phone:
${message.phone || 'Not provided'}

Subject:
${message.subject}

Message:

${message.message}

Submitted:
${submittedDate}

Visitor Type:
${visitorType}

--------------------------------
`

    // Send via Resend HTTP API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `Travel Website <${fromEmail}>`,
        to: [receivingEmail],
        reply_to: message.email,
        subject: emailSubject,
        text: emailBody,
      }),
    })

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text()
      console.error('Resend API Error:', resendError)
      
      // Update database status to email_failed
      await supabaseClient
        .from('contact_messages')
        .update({ status: 'email_failed' })
        .eq('id', messageId)

      return new Response(
        JSON.stringify({ success: false, error: 'Email delivery failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Success - update database status
    await supabaseClient
      .from('contact_messages')
      .update({ status: 'email_sent' })
      .eq('id', messageId)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Edge function error:', error.message)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
