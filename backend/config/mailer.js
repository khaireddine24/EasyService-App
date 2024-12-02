import nodemailer from "nodemailer";
import Client from '../models/client.js';
import Prestataire from '../models/prestataire.js';

// SMTP Transporter Configuration
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "6ec8e9002@smtp-brevo.com",
    pass: "dh6Um9SGKPn2CyDz"
  }
});

// Email Verification Function
export const sendVerificationEmail = async (email, token) => {
  try {
    const verificationLink = `http://localhost:${process.env.PORT || 5000}/auth/verify-email?token=${token}`;
    
    const mailOptions = {
      from: "no-reply@easyservice.com",
      to: email,
      subject: "Vérification de votre email",
      text: `Bonjour, merci de vérifier votre email en cliquant sur ce lien : ${verificationLink}`,
      html: `<p>Bonjour,</p>
             <p>Merci de vérifier votre email en cliquant sur le lien ci-dessous :</p>
             <a href="${verificationLink}">Vérifiez votre email</a>`
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email de vérification envoyé : ", info.response);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email : ", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Reset Password Email Function
export const sendResetPasswordLink = async (email, token) => {
  if (!email) {
    throw new Error('Email is required.');
  }

  try {
    // Find user by email (can be a client or prestataire)
    let user = await Client.findOne({ email });
    if (!user) {
      user = await Prestataire.findOne({ email });
    }
    
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }

    // Reset link
    const resetLink = `${process.env.VITE_URL}/reset-password?token=${token}`;
    
    // Send email
    const mailOptions = {
      from: 'no-reply@easyservice.com',
      to: email,
      subject: 'Réinitialisation du mot de passe',
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`,
      html: `<p>Bonjour,</p>
             <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous :</p>
             <a href="${resetLink}">Réinitialiser mon mot de passe</a>`
    };
    
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default { sendVerificationEmail, sendResetPasswordLink };