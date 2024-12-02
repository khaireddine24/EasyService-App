import mongoose from 'mongoose';

const prestataireSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String, // URL vers l'image de profil
    default: null
  },
  role: {
    type: String,
    enum: ['client', 'prestataire'],
    required: true
  },
  services: {
    type: [String]
    ,
    required: true,
    maxlength: 3  // This limits the services array to a max length of 3
  },
  documents: {
    identityProof: { 
      type: String, // URL vers le document d'identité
      default: null 
    },
    qualificationCertificates: [{
      type: String, // URL vers les certificats de qualification
      default: null
    }],
    additionlPhoto: [{
      type: String, // URL vers d'autres documents justificatifs
      default: null
    }]
  },
  verifiedEmail: { type: Boolean, default: false },
}, { timestamps: true });

const Prestataire = mongoose.model('Prestatire', prestataireSchema);

export default Prestataire