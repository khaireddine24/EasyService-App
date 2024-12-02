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
export const sendResetOtp = async (email, otp) => {
  if (!email || !otp) {
    throw new Error('Email and OTP are required.');
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

    // Email content for OTP
    const mailOptions = {
      from: 'no-reply@easyservice.com',
      to: email,
      subject: 'Votre Code OTP pour Réinitialisation du Mot de Passe',
      text: `Bonjour,\n\nVotre code OTP pour réinitialiser votre mot de passe est : ${otp}\n\nCe code est valide pendant 5 minutes.`,
      html: `<p>Bonjour,</p>
             <p>Votre code OTP pour réinitialiser votre mot de passe est : <strong>${otp}</strong></p>
             <p>Ce code est valide pendant <strong>5 minutes</strong>.</p>`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default { sendVerificationEmail, sendResetOtp };