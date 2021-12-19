import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendVerifyEmail = async (id, email, hash) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `<a href="${process.env.APP_URL}/verify/${id}/${hash}">Verify your email</a>`,
  };

  return transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (id, email, hash) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Reset your password",
    html: `<a href="${process.env.APP_URL}/reset/${id}/${hash}">Reset your password</a>`,
  };

  return transporter.sendMail(mailOptions);
};
