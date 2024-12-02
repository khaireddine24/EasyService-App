import nodemailer from "nodemailer";

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure:false,
  auth: {
    user: "6ec8e9002@smtp-brevo.com", // Ton email enregistré sur Sendinblue
    pass: "dh6Um9SGKPn2CyDz"            // Ta clé API SMTP
  }
});

// Fonction pour envoyer un email de vérification
const sendVerificationEmail = async (email, token) => {
  try {
    const verificationLink = `http://localhost:${process.env.PORT || 5000}/auth/verify-email?token=${token}`;

    const mailOptions = {
      from: "no-reply@easyservice.com",            // Expéditeur
      to: email,                                   // Destinataire
      subject: "Vérification de votre email",     // Sujet
      text: `Bonjour, merci de vérifier votre email en cliquant sur ce lien : ${verificationLink}`, // Corps texte brut
      html: `<p>Bonjour,</p>
             <p>Merci de vérifier votre email en cliquant sur le lien ci-dessous :</p>
             <a href="${verificationLink}">Vérifiez votre email</a>` // Optionnel, contenu HTML
    };

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email de vérification envoyé : ", info.response);
    return true; // Succès
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email : ", error);
    return false; // Échec
  }
};


// Fonction pour envoyer un email de reset
const sendResetPasswordLink = async (email,token) => {
 
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // Trouver l'utilisateur par email (peut être un client ou un prestataire)
    let user = await Client.findOne({ email });
    if (!user) {
      user = await Prestataire.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

   
    // Lien de réinitialisation
    const resetLink = `${process.env.VITE_URL}/reset-password?token=${token}`;

    // Envoyer le lien par email
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

    return res.status(200).json({ message: 'Lien de réinitialisation envoyé.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de l\'envoi du lien de réinitialisation.' });
  }
};

export default {sendVerificationEmail, sendResetPasswordLink };


