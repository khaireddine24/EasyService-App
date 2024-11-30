import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,  // Ensures the first name is required
  },
  lastName: {
    type: String,
    required: true,  // Ensures the last name is required
  },
  email: {
    type: String,
    required: true,  // Ensures the email is required
    unique: true,    // Ensures the email is unique across all users
  },
  password: {
    type: String,
    required: true,  // Ensures the password is required
  },
  phone: {
    type: String,
    required: true,  // Ensures the phone number is required
  },
  address: {
    type: String,
    required: true,  // Ensures the address is required
  },
  role: {
    type: String,
    required: true,  // Ensures the role is required
    enum: ['client', 'prestataire'],  // Only allows 'client' or 'prestataire' as valid roles
    default: 'client',  // Default role is 'client'
  },
  profilePicture: {
    type: String, // URL of the profile picture
    default: null, // Default is null, meaning no picture
  },
});

const Client = mongoose.model('User', userSchema);

export default Client