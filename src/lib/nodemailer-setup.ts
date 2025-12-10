import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rokyuddin.dev@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORDS,
  },
});
