import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  service: config.mailService,
  auth: {
    user: config.mailUser,
    pass: config.mailPass,
  },
});

export const sendVerifyEmail = async (id, email, hash) => {
  const mailOptions = {
    from: config.mailUser,
    to: email,
    subject: "Verify your email",
    html: `<a href="${config.appUrl}/verify/${id}/${hash}">Verify your email</a>`,
  };

  return transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (id, email, hash) => {
  const mailOptions = {
    from: config.mailUser,
    to: email,
    subject: "Reset your password",
    html: `<a href="${config.appUrl}/reset/${id}/${hash}">Reset your password</a>`,
  };

  return transporter.sendMail(mailOptions);
};
