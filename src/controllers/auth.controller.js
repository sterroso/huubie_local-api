import jwt from 'jsonwebtoken';
import * as AuthService from '../services/auth.service.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.authenticateUser(email, password);
    const token = jwt.sign(
      result,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie(
      'jwtToken',
      token,
      {
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      }
    );

    res.status(200).json({ message: "Login successful." })
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getEmailConfirmationToken = async (req, res) => {};

export const getPasswordChangeAuthorizationToken = async (req, res) => {};
