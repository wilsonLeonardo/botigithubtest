import Joi from 'joi';

export enum Languages {
  'JS' = 'javascript',
  'GO' = 'golang',
  'PHP' = 'php',
  'Java' = 'java',
  'HTML' = 'html',
  'TS' = 'typescript',
  'C#' = 'csharp',
  'XML' = 'xml',
  'Python' = 'python',
}

const createTopFiveRepoSchema = Joi.object().keys({
  programmingLanguages: Joi.array()
    .items(Joi.string().valid(...Object.values(Languages)))
    .length(5)
    .unique()
    .required(),
});

export default createTopFiveRepoSchema;
