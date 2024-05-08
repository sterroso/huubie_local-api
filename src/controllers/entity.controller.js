import { validationResult } from 'express-validator';
import * as EntityService from '../services/entity.service.js';

export const createEntity = async (req, res) =>  {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const entity = await EntityService.createEntity(req.body);

    res.status(201).json({ entity: entity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
