import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  access: {
    admin: ({ req: { user } }) => Boolean(user?.roles.includes("super-admin")),
  },
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Only prevent verification email for Google OAuth users who are already verified
        if (data._verified === true) {
          // Set verification token to null to prevent email from being sent
          data._verificationToken = null;
        }
        return data;
      }
    ]
  },

  // TODO
  // change this when resend is propery configured
  auth: {
    tokenExpiration: ((60 * 60) * 24) * 30, // 30 days
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    },
  },
  // auth: {
  //   verify: {
  //     generateEmailHTML: ({ token, user }) => {
  //       const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`
  //       const userName = user.first_name || user.email.split('@')[0]
  //       const currentYear = new Date().getFullYear()

  //       return `
  //         <!DOCTYPE html>
  //         <html lang="en">
  //         <head>
  //           <meta charset="UTF-8">
  //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //           <title>Verify Your Email - GreekGod</title>
  //           <style>
  //             body {
  //               margin: 0;
  //               padding: 0;
  //               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  //               background-color: #f8fafc;
  //               color: #1e293b;
  //             }
  //             .container {
  //               max-width: 600px;
  //               margin: 0 auto;
  //               background-color: #ffffff;
  //               border-radius: 16px;
  //               overflow: hidden;
  //               box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  //             }
  //             .header {
  //               background: linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%);
  //               padding: 50px 30px;
  //               text-align: center;
  //               position: relative;
  //               overflow: hidden;
  //             }
  //             .header::before {
  //               content: '';
  //               position: absolute;
  //               top: 0;
  //               left: 0;
  //               right: 0;
  //               bottom: 0;
  //               background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  //               opacity: 0.3;
  //             }
  //             .logo {
  //               font-size: 32px;
  //               font-weight: 800;
  //               color: #ffffff;
  //               margin-bottom: 12px;
  //               position: relative;
  //               z-index: 1;
  //               text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  //             }
  //             .subtitle {
  //               color: #dcfce7;
  //               font-size: 16px;
  //               margin: 0;
  //               position: relative;
  //               z-index: 1;
  //               font-weight: 500;
  //             }
  //             .content {
  //               padding: 50px 30px;
  //               text-align: center;
  //               background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  //             }
  //             .greeting {
  //               font-size: 28px;
  //               font-weight: 700;
  //               color: #166534;
  //               margin-bottom: 20px;
  //               background: linear-gradient(135deg, #166534 0%, #15803d 100%);
  //               -webkit-background-clip: text;
  //               -webkit-text-fill-color: transparent;
  //               background-clip: text;
  //             }
  //             .message {
  //               font-size: 16px;
  //               color: #374151;
  //               line-height: 1.7;
  //               margin-bottom: 40px;
  //               max-width: 480px;
  //               margin-left: auto;
  //               margin-right: auto;
  //             }
  //             .button {
  //               display: inline-block;
  //               background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  //               color: #ffffff;
  //               text-decoration: none;
  //               padding: 18px 36px;
  //               border-radius: 12px;
  //               font-weight: 600;
  //               font-size: 16px;
  //               transition: all 0.3s ease;
  //               box-shadow: 0 4px 15px -3px rgba(34, 197, 94, 0.4);
  //               position: relative;
  //               overflow: hidden;
  //             }
  //             .button::before {
  //               content: '';
  //               position: absolute;
  //               top: 0;
  //               left: -100%;
  //               width: 100%;
  //               height: 100%;
  //               background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  //               transition: left 0.5s;
  //             }
  //             .button:hover::before {
  //               left: 100%;
  //             }
  //             .button:hover {
  //               transform: translateY(-2px);
  //               box-shadow: 0 8px 25px -5px rgba(34, 197, 94, 0.5);
  //             }
  //             .link-section {
  //               margin-top: 30px;
  //               padding: 20px;
  //               background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  //               border-radius: 12px;
  //               border: 1px solid #bbf7d0;
  //             }
  //             .link-text {
  //               color: #166534;
  //               font-size: 14px;
  //               margin-bottom: 12px;
  //               font-weight: 500;
  //             }
  //             .link {
  //               color: #16a34a;
  //               text-decoration: none;
  //               font-weight: 600;
  //               word-break: break-all;
  //             }
  //             .link:hover {
  //               color: #15803d;
  //               text-decoration: underline;
  //             }
  //             .footer {
  //               background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  //               padding: 40px 30px;
  //               text-align: center;
  //               border-top: 1px solid #e2e8f0;
  //             }
  //             .footer-text {
  //               color: #64748b;
  //               font-size: 14px;
  //               margin: 0;
  //               line-height: 1.6;
  //             }
  //             .footer-accent {
  //               color: #16a34a;
  //               font-weight: 600;
  //             }
  //             .divider {
  //               width: 60px;
  //               height: 3px;
  //               background: linear-gradient(90deg, #22c55e, #16a34a);
  //               margin: 20px auto;
  //               border-radius: 2px;
  //             }
  //             @media (max-width: 600px) {
  //               .container {
  //                 margin: 20px;
  //                 border-radius: 12px;
  //               }
  //               .header, .content, .footer {
  //                 padding: 40px 20px;
  //               }
  //               .greeting {
  //                 font-size: 24px;
  //               }
  //               .button {
  //                 padding: 16px 32px;
  //                 font-size: 15px;
  //               }
  //               .logo {
  //                 font-size: 28px;
  //               }
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <div class="container">
  //             <div class="header">
  //               <div class="logo">GreekGod</div>
  //               <p class="subtitle">Premium Fashion & Lifestyle</p>
  //             </div>

  //             <div class="content">
  //               <h1 class="greeting">Welcome to GreekGod, ${userName}! 🌟</h1>
  //               <p class="message">
  //                 Thank you for joining our exclusive community! To complete your registration and unlock access to our premium collection, please verify your email address by clicking the button below.
  //               </p>

  //               <a href="${url}" class="button">Verify Email Address</a>

  //               <div class="link-section">
  //                 <p class="link-text">If the button doesn't work, copy and paste this link into your browser:</p>
  //                 <a href="${url}" class="link">${url}</a>
  //               </div>

  //               <div class="divider"></div>

  //               <p class="message" style="font-size: 14px; color: #6b7280; margin-bottom: 0;">
  //                 This verification link will expire in 24 hours for your security.
  //               </p>
  //             </div>

  //             <div class="footer">
  //               <p class="footer-text">
  //                 This email was sent to <span class="footer-accent">${user.email}</span>. 
  //                 If you didn't create an account with GreekGod, you can safely ignore this email.
  //               </p>
  //               <p class="footer-text" style="margin-top: 16px;">
  //                 © ${currentYear} <span class="footer-accent">GreekGod</span>. All rights reserved.
  //               </p>
  //             </div>
  //           </div>
  //         </body>
  //         </html>
  //       `
  //     },
  //     generateEmailSubject: () => {
  //       return `Welcome to GreekGod! Please verify your email address`
  //     },
  //   },
  // },

  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text"
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      required: false
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      required: false
    },
    {
      admin: {
        position: "sidebar"
      },
      name: "roles",
      required: true,
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: [
        "user",
        "super-admin"
      ]
    },
    {
      name: 'appUserId',
      type: 'relationship',
      relationTo: 'appUsers',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: '_verified',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' }
    },
    // {
    //   name: "deliveryInfo",
    //   required: false,
    //   type: "relationship",
    //   relationTo: "deliveryAddresses",
    //   hasMany: true
    // }
  ],
}
