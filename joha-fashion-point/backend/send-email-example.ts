/**
 * This file is an example and blueprint for creating a secure backend endpoint
 * to send your order confirmation emails using Resend.
 *
 * Why do you need a backend for this?
 * 1.  SECURITY: Your Resend API key is a secret. It should never be exposed in
 *     frontend code (like React), as anyone could steal it and send emails
 *     from your account. A backend server keeps your key safe.
 * 2.  BROWSER RESTRICTIONS (CORS): For security, web browsers block web pages
 *     from making API requests to services like Resend directly. These requests
 *     must come from a server you control.
 *
 * How to use this file:
 * - This code is designed to run in a Node.js environment on a server.
 * - You can use it to create a "serverless function" on platforms like Vercel,
 *   Netlify, or AWS Lambda.
 * - A backend developer can use this as a guide to integrate into an Express.js
 *   or any other backend framework.
 *
 * SETUP:
 * 1. Install required packages in your backend project:
 *    npm install resend react react-dom
 *
 * 2. Set your secret Resend API key as an environment variable on your server named
 *    `RESEND_API_KEY`. Do not write the key directly in the code.
 *
 * 3. In your frontend `OrderForm.tsx`, you would replace the simulation logic with a
 *    `fetch` call to the URL of this deployed backend endpoint.
 */

// Import necessary libraries. 'resend' for sending email, and 'react-dom/server'
// to convert your React email template into an HTML string.
import { Resend } from 'resend';
// FIX: Import React to support JSX syntax.
import React from 'react';
import { renderToString } from 'react-dom/server';
import OrderEmailTemplate from '../components/OrderEmailTemplate'; // Assuming the template is accessible
import type { Product } from '../types'; // Assuming types are accessible

// --- This is a mock server endpoint function ---
// In a real framework (like Next.js), this might look like:
// export default async function handler(req, res) { ... }

async function sendOrderConfirmationEmail(orderData: any, productData: Product) {
  // 1. Initialize Resend with the API key from environment variables.
  //    This is the SECURE way to handle your API key.
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 2. Prepare the order details from the incoming request body.
  const { name, email, whatsapp, address, size, color, quantity } = orderData;
  const totalPrice = productData.price * quantity;

  try {
    // 3. Render the React email template to an HTML string.
    const emailHtml = renderToString(
      <OrderEmailTemplate
        product={productData}
        order={{ name, email, whatsapp, address, size, color, quantity, totalPrice }}
      />
    );

    // 4. Send the email using the Resend SDK.
    const { data, error } = await resend.emails.send({
      from: 'Joha Fashion Point <onboarding@resend.dev>', // Must be a domain you've verified with Resend.
      to: [email], // Send the primary email to the customer.
      bcc: ['mdjoha598@gmail.com', 'mdtaqitahmid598@gmail.com'], // Send copies to store owners.
      subject: `Your Joha Fashion Point Order Confirmation for ${productData.name}`,
      html: emailHtml, // The HTML version of your email.
    });

    // 5. Handle potential errors from the email service.
    if (error) {
      console.error('Error sending email:', error);
      // In a real app, you would return an error response here.
      // e.g., return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
      return { success: false, error };
    }

    // 6. Log success and return a success response.
    console.log('Email sent successfully:', data);
    // e.g., return new Response(JSON.stringify({ success: true, data }), { status: 200 });
    return { success: true, data };

  } catch (exception) {
    console.error('An exception occurred:', exception);
    // e.g., return new Response(JSON.stringify({ error: 'An internal server error occurred' }), { status: 500 });
    return { success: false, error: exception };
  }
}

// --- Example of how you might call this function with data from the frontend ---
/*
const mockOrderDataFromFrontend = {
  name: "Jane Doe",
  email: "customer@example.com",
  whatsapp: "+1234567890",
  address: "123 Main St, Anytown, USA",
  size: "M",
  color: "Black",
  quantity: 1
};

const mockProductData = {
  id: 1,
  name: 'Classic Denim Jacket',
  price: 6500,
  images: ['https://picsum.photos/seed/picsum1-1/800/1000'],
  //... other product fields
};

// In your server endpoint, you would call the function like this:
// await sendOrderConfirmationEmail(mockOrderDataFromFrontend, mockProductData);
*/