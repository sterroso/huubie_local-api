import { validationResult } from 'express-validator';
import * as EntityService from '../services/entity.service.js';
import { getUserById } from '../services/user.service.js';
import {
  validatePage,
  validatePageSize
} from '../utils/httpRequest.utils.js';

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

export const updateEntity = async (req, res) => {
  const { user } = req;
  const reqUser = await getUserById(user.userId);
  console.log('requesting user', reqUser);

  const errors = validationResult(req);

  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedEntity = await EntityService.updateEntity(id, req.body);

    if (!updatedEntity) {
      return res.status(404).json({ message: `Entity with ID ${id} was not found.` });
    }

    res.status(200).json({ entity: updatedEntity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEntity = async (req, res) => {
  const { user } = req;
  const { userId } = user;
  const { id } = req.params;

  try {
    const deletedEntity = await EntityService.deleteEntity(id, userId);

    if (!deletedEntity) {
      return res.status(404).json({ message: `Entity with ID ${id} was not found.` });
    }

    res.status(200).json({ deleted: deletedEntity.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEntityById = async (req, res) => {
  const { id } = req.params;

  try {
    const entity = await EntityService.getEntityById(id);

    if (!entity) {
      return res.status(404).json({ message: `Entity with ID ${id} was not found.` });
    }

    res.status(200).json({ entity: entity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEntityByTaxId = async (req, res) => {
  res.status(501).json({ message: "Method not implemented yet." });
};

export const getEntities = async (req, res) => {
  const { page, pageSize, taxId, subscriptionStatus } = req.query;

  const pageNum = validatePage(page);

  const pageSizeNum = validatePageSize(pageSize);

  const query = {};

  if (taxId) {
    query.tax_id = taxId
  }

  if (subscriptionStatus) {
    query.subscription_status = subscriptionStatus;
  }

  try {
    const entities = await EntityService.getEntities(pageNum, pageSizeNum, query);

    if (!entities || entities.length < 1) {
      return res.status(404).json({ message: "No entities were found." });
    }

    res.status(200)
      .json({
        status: {
          code: 200,
          name: "OK"
        },
        data: entities,
        pageSize: pageSizeNum,
        currentPage: pageNum,
        totalRecords: await EntityService.getActiveRecordsCount(query)
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
