import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, verificationToken } = req.body;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking the following link: ${process.env.NEXTAUTH_URL}/verify?token=${verificationToken}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      res.status(500).json({ error: "Error sending verification email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
