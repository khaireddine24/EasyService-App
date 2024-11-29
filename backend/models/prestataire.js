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
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 3; // Ensures that no more than 3 services are selected
      },
      message: 'You can select a maximum of 3 services.'
    },
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
    additionalDocuments: [{
      type: String, // URL vers d'autres documents justificatifs
      default: null
    }]
  }
}, { timestamps: true });

const Prestatire = mongoose.model('Prestatire', prestataireSchema);

module.exports = Prestatire;
