import Joi from 'joi';

const getRepoDetailsSchema = Joi.object().keys({
  repoId: Joi.number(),
});

export default getRepoDetailsSchema;
