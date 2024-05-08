import bcrypt from 'bcryptjs';
import * as UserRepository from '../repositories/user.repository.js';

export const createUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);
  
  return await UserRepository.createUser(userData);
};
