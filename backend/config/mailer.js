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
      html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 20px;
            text-align: center;
          }
          .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            color: #888;
            font-size: 12px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Vérification de votre email</h1>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Merci de créer votre compte sur EasyService. Pour finaliser votre inscription, 
            veuillez cliquer sur le bouton de vérification ci-dessous :</p>
            
            <a href="${verificationLink}" class="button">Vérifier mon email</a>
            
            <p>Si le bouton ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :</p>
            <p style="word-break: break-all;">${verificationLink}</p>
            
            <p>Si vous n'avez pas créé de compte, ignorez simplement cet email.</p>
          </div>
          <div class="footer">
            <p>© 2024 EasyService. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email de vérification envoyé : ", info.response);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email : ", error);
    throw error;
  }
};

export const sendResetOtp = async (email, otp) => {
  if (!email || !otp) {
    throw new Error('Email and OTP are required.');
  }

  try {
    let user = await Client.findOne({ email });
    if (!user) {
      user = await Prestataire.findOne({ email });
    }

    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }

    const mailOptions = {
      from: 'no-reply@easyservice.com',
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background-color: #FF6B6B;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 20px;
            text-align: center;
          }
          .otp-code {
            background-color: #F0F0F0;
            display: inline-block;
            padding: 15px 25px;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 5px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #888;
            font-size: 12px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Réinitialisation de mot de passe</h1>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Vous avez demandé une réinitialisation de votre mot de passe. 
            Utilisez le code OTP ci-dessous pour compléter le processus :</p>
            
            <div class="otp-code">${otp}</div>
            
            <p>Ce code est valide pendant <strong>5 minutes</strong>.</p>
            
            <p>Si vous n'avez pas demandé de réinitialisation, 
            veuillez ignorer cet email ou contacter notre support.</p>
          </div>
          <div class="footer">
            <p>© 2024 EasyService. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { sendVerificationEmail, sendResetOtp };