import * as EntityRepository from '../repositories/entity.repository.js';

export const createEntity = async (entityData) => {
  return await EntityRepository.createEntity(entityData);
};
