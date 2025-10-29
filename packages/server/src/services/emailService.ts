// server/src/services/emailService.ts
import nodemailer from "nodemailer";
import { User } from "../models/User";
import { UserRoles } from "../types/userTypes";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
  }

  async sendEmail(
    to: string | string[],
    subject: string,
    html: string
  ): Promise<void> {
    try {
      const mailOptions = {
        from: `Stack Nest <${process.env.EMAIL_USER}>`,
        to: Array.isArray(to) ? to.join(",") : to,
        subject: subject,
        html: html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully");
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  }

  async sendNewBookNotification(
    bookTitle: string,
    addedBy: string
  ): Promise<void> {
    const adminEmails = (await User.find({ role: UserRoles.admin })).map(
      (user) => user.email
    );

    if (adminEmails.length === 0) {
      console.log("No admin emails configured");
      return;
    }

    const subject = `📚 New Book Added: ${bookTitle}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Book Added to Library</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Book Details:</h3>
          <p><strong>Title:</strong> ${bookTitle}</p>
          <p><strong>Added by:</strong> ${addedBy}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;

    await this.sendEmail(adminEmails, subject, html);
  }
}

export const emailService = new EmailService();
