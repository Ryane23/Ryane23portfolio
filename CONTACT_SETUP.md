# Contact Form Setup Guide

Your contact form is now configured to send emails directly to your inbox using Web3Forms!

## Setup Instructions

### Step 1: Get Your Web3Forms Access Key

1. Visit [Web3Forms](https://web3forms.com)
2. Click "Get Started" or "Create Access Key"
3. Enter your email address: **erickryan2@gmail.com**
4. Check your email for the verification link
5. Click the verification link to confirm your email
6. You'll receive your **Access Key**

### Step 2: Add Access Key to Your Project

1. Open the `.env` file in your project root
2. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key:
   ```
   VITE_WEB3FORMS_ACCESS_KEY="your_actual_access_key_here"
   ```
3. Save the file

### Step 3: Restart Your Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 4: Test the Contact Form

1. Open your website in the browser
2. Navigate to the Contact section
3. Fill out the form and click "Send Message"
4. Check your email at erickryan2@gmail.com for the message

## How It Works

- When someone fills out your contact form, the data is sent to Web3Forms API
- Web3Forms forwards the message to your email (erickryan2@gmail.com)
- You'll receive an email notification with:
  - Sender's name
  - Sender's email
  - Their message
  - Subject line: "New Portfolio Contact from [Name]"

## Features

✅ Free forever (up to 250 submissions/month)
✅ No backend required
✅ Spam protection included
✅ Email notifications
✅ Reply directly to sender's email
✅ Fully customizable

## Troubleshooting

**Problem:** Not receiving emails
- Check your spam/junk folder
- Verify your access key is correct in `.env`
- Make sure you verified your email with Web3Forms
- Check Web3Forms dashboard for submission logs

**Problem:** "Failed to send message" error
- Check browser console for errors
- Verify `.env` file has the correct key
- Make sure dev server was restarted after adding the key

## Alternative: Using Your Own SMTP

If you prefer to use your own email service (Gmail, Outlook, etc.), you can create a Supabase Edge Function instead. Let me know if you'd like help with that!

## Support

Web3Forms Documentation: https://docs.web3forms.com
Web3Forms Support: support@web3forms.com
