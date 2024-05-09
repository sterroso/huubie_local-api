import * as UserService from '../services/user.service.js';
import { validationResult } from 'express-validator';

export const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await UserService.createUser(req.body);

    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  res.status(501).json({ message: "Method not implemented yet." });
};
