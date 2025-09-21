// import nodemailer from 'nodemailer';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const { name, email, subject, message } = await request.json();

//     // Validation
//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { message: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { message: 'Invalid email format' },
//         { status: 400 }
//       );
//     }

//     // Create transporter
//     const transporter = nodemailer.createTransporter({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//       },
//     });

//     // Email options
//     const mailOptions = {
//       from: process.env.GMAIL_USER,
//       to: process.env.GMAIL_USER, // Send to yourself
//       subject: `Contact Form: ${subject || 'No Subject'}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background: #ff6b35; color: white; padding: 20px; text-align: center;">
//             <h1>New Contact Form Submission</h1>
//           </div>
//           <div style="background: #f9f9f9; padding: 20px;">
//             <p><strong style="color: #ff6b35;">Name:</strong> ${name}</p>
//             <p><strong style="color: #ff6b35;">Email:</strong> ${email}</p>
//             <p><strong style="color: #ff6b35;">Subject:</strong> ${subject || 'No Subject'}</p>
//             <p><strong style="color: #ff6b35;">Message:</strong></p>
//             <div style="background: white; padding: 15px; border-left: 4px solid #ff6b35;">
//               ${message.replace(/\n/g, '<br>')}
//             </div>
//           </div>
//         </div>
//       `,
//       replyTo: email, // So you can reply directly to the sender
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: 'Email sent successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Email error:', error);
//     return NextResponse.json(
//       { message: 'Failed to send email' },
//       { status: 500 }
//     );
//   }
// }

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports  
      // service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      // from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: `Contact Form: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #ff6b35; color: white; padding: 20px; text-align: center;">
            <h1>New Contact Form Submission</h1>
          </div>
          <div style="background: #f9f9f9; padding: 20px;">
            <p><strong style="color: #ff6b35;">Name:</strong> ${name}</p>
            <p><strong style="color: #ff6b35;">Email:</strong> ${email}</p>
            <p><strong style="color: #ff6b35;">Subject:</strong> ${subject || 'No Subject'}</p>
            <p><strong style="color: #ff6b35;">Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #ff6b35;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      `,
      replyTo: email, // So you can reply directly to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    return NextResponse.json(
      { 
        message: 'Failed to send email', 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
      },
      { status: 500 }
    );
  }
}