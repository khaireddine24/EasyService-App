
import Client  from '../models/client.js';
import OTP  from '../models/otp.js';
import Prestataire  from '../models/prestataire.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendVerificationEmail, sendResetOtp } from '../config/mailer.js';


const register = async (req, res) => {
    const { firstName, lastName, phone, email, password, address, role } = req.body;
  
    // Check if all required fields are provided
    if (!firstName || !lastName || !phone || !email || !password || !address || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Check if the role is valid (either 'client' or 'prestataire')
    if (role !== 'client' && role !== 'prestataire') {
      return res.status(400).json({ message: 'Invalid role. Choose either "client" or "prestataire".' });
    }
  
    // Check if the user already exists in the appropriate model
    let foundUser;
    foundUser = await Client.findOne({ email }).exec();
    if (!foundUser) {
      foundUser = await Prestataire.findOne({ email }).exec();
    }
  
    if (foundUser) {
      return res.status(401).json({ message: 'User already exists' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the new user in the appropriate model based on the role
    let user;
    if (role === 'client') {
      user = await Client.create({
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        address,
        role,
      });
    } else if (role === 'prestataire') {
      user = await Prestataire.create({
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        address,
        role,
      });
    }



  // Create email verification token
  const verificationToken = jwt.sign(
    { userId: user._id },
    process.env.VERIFICATION_TOKEN_SECRET,
    { expiresIn: '1h' } // Token expiration time (1 hour)
  );


  try {
    await sendVerificationEmail(user.email, verificationToken);
  } catch (error) {
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }


  
    // Create an access token (JWT)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' } // Adjust expiration as needed
    );
  
    // Create a refresh token (JWT)
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          role: user.role,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' } // 7 days for the refresh token
    );
  
    // Set the refresh token in a cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // accessible only by web server
      secure: true, // https required
      sameSite: 'None', // for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });
  
    // Send the response with the user data and tokens
    res.status(201).json({
      accessToken,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
  };


  const verifyEmail = async (req, res) => {
    const { token } = req.query;  // Get the token from the query string
  
    if (!token) {
      return res.status(400).json({ message: 'No verification token provided.' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
      const userId = decoded.userId;
  
      // Find the user by ID (can be a client or prestataire)
      let user = await Client.findById(userId);
      if (!user) {
        user = await Prestataire.findById(userId);
      }
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Update the user's verified status
      user.verifiedEmail = true;
      await user.save();
  
      // Send a success response
      return res.redirect(`${process.env.VITE_URL}/?status=success`);

    } catch (error) {
      console.log(error);
      return res.redirect(`${process.env.VITE_URL}/?status=error`);
    }
  };
  



  const resetPassword = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      let foundUser;
  
      // Check if the user exists in the Client collection
      foundUser = await Client.findOne({ email }).exec();
      if (!foundUser) {
        // If not found in Client, check in the Prestataire collection
        foundUser = await Prestataire.findOne({ email }).exec();
      }
  
      // If the user is still not found, return an error
      if (!foundUser) {
        return res.status(401).json({ message: 'User not found.' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password with the hashed password
      foundUser.password = hashedPassword;
  
      // Save the updated user
      await foundUser.save();
  
      // Respond with success message
      return res.status(200).json({
        message: 'Password has been successfully reset.',
      });
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while resetting the password.' });
    }
  };
  


const sendOTP = async (req, res) => {
  const { email } = req.body;

  console.log('aasfour')
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the OTP to the database
    await OTP.create({ email, otp });

   
   await sendResetOtp(email,otp)

   
    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error sending OTP.', error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  try {
    // Retrieve the most recent OTP for the given email
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 }); // Sort by createdAt (descending)

    if (!otpRecord) {
      return res.status(404).json({ message: 'No OTP found for this email.' });
    }

    // Check if the OTP matches
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Check if the OTP has expired (5 minutes expiration window)
    const otpExpirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (Date.now() - otpRecord.createdAt > otpExpirationTime) {
      return res.status(400).json({ message: 'OTP expired.' });
    }

    // OTP is valid, proceed with further logic (e.g., resetting password)
    return res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying OTP.', error: error.message });
  }
};



  



const login = async (req, res) => {

    const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }


   // Check for the user in the Client collection first
   let foundUser = await Client.findOne({ email }).exec();
  
   // If not found in the Client collection, search in the Prestataire collection
   if (!foundUser) {
     foundUser = await Prestataire.findOne({ email }).exec();
   }
 
   // If the user doesn't exist in either collection
   if (!foundUser) {
     return res.status(401).json({ message: 'User does not exist' });
   }

   // Compare the provided password with the stored hashed password
  const match = await bcrypt.compare(password, foundUser.password);

  // If password doesn't match
  if (!match) {
    return res.status(401).json({ message: 'Wrong Password' });
  }

    // Create the access token (JWT)
    const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' } // Adjust expiration as needed
      );

      
       // Create the refresh token (JWT)
    const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
        role: foundUser.role,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  // Set the refresh token in the cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: true, // https required
    sameSite: 'None', // for cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  });


    // Send the access token and user email in the response
    res.json({
        accessToken,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      });
}

const refresh = async (req, res) => {
    const cookies = req.cookies;
  
    // Check if the refresh token exists in the cookies
    if (!cookies?.jwt) {
      return res.status(401).json({ message: 'Unauthorized: No refresh token found' });
    }
  
    const refreshToken = cookies.jwt;
  
    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid refresh token' });
      }
  
      try {
        // Find the user based on the ID in the decoded token
        const foundUser = await User.findById(decoded.UserInfo.id).exec();
        if (!foundUser) {
          return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
  
        // Generate a new access token
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: foundUser._id,
              role: foundUser.role,  // Include role to maintain user role information
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }  // Typically 1 hour for access tokens
        );
  
        // Respond with the new access token
        res.json({ accessToken });
      } catch (error) {
        // Catch any unexpected errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  };






const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    res.json({ message: 'Cookie cleared' });
  };


export default { login, register, logout, refresh, verifyEmail, resetPassword,sendOTP,verifyOTP };
