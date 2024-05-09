import * as EntityRepository from '../repositories/entity.repository.js';

export const createEntity = async (entityData) => {
  return await EntityRepository.createEntity(entityData);
};

export const updateEntity = async (entityId, entityData) => {
  return await EntityRepository.updateEntity(entityId, entityData);
};

export const deleteEntity = async (entityId, reqUserId) => {
  return await EntityRepository.deleteEntity(entityId, reqUserId);
};

export const getEntityById = async (entityId) => {
  return await EntityRepository.getEntityById(entityId);
};

export const getEntityByTaxId = async (entityTaxId) => {
  return await EntityRepository.getEntityByTaxId(entityTaxId);
};

export const getEntities = async (page, pageSize, query) => {
  return await EntityRepository.getEntities(page, pageSize, query);
};

export const getActiveRecordsCount = async (query) => {
  return await EntityRepository.getActiveRecordsCount(query);
}
