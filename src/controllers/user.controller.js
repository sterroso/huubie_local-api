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
