const Joi = require('joi');

const schemas = {
  post: {
    create: Joi.object({
      title: Joi.string().min(1).max(200).required(),
      slug: Joi.string().pattern(/^[a-z0-9-]+$/).min(1).max(100),
      description: Joi.string().max(500).allow(''),
      image: Joi.alternatives().try(Joi.string().uri(), Joi.string().pattern(/^\/.*/)).allow(''),
      content: Joi.string().required(),
      status: Joi.string().valid('draft', 'published').default('draft'),
    }),
    update: Joi.object({
      title: Joi.string().min(1).max(200),
      slug: Joi.string().pattern(/^[a-z0-9-]+$/).min(1).max(100),
      description: Joi.string().max(500).allow(''),
      image: Joi.alternatives().try(Joi.string().uri(), Joi.string().pattern(/^\/.*/)).allow(''),
      content: Joi.string().min(1),
      status: Joi.string().valid('draft', 'published'),
    }).min(1),
    publish: Joi.object({
      status: Joi.string().valid('published').required(),
    }),
  },
  auth: {
    login: Joi.object({
      password: Joi.string().min(8).required(),
    }),
  },
  slug: Joi.string().pattern(/^[a-z0-9-]+$/).required(),
  id: Joi.number().integer().positive().required(),
};

module.exports = schemas;