const schemas = require('../config/validation.config');
const logger = require('../config/logging.config');

const validate = (schemaType, schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaType]?.[schemaName];

    if (!schema) {
      logger.error(`Validation schema not found: ${schemaType}.${schemaName}`);
      return res.status(500).json({ error: 'Server error' });
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      logger.warn(`Validation error: ${errors.join(', ')}`);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    req.validatedBody = value;
    next();
  };
};

const validateParams = (paramType) => {
  return (req, res, next) => {
    const schema = schemas[paramType];
    const paramValue = req.params[paramType];

    if (!schema) {
      logger.error(`Validation schema not found for param: ${paramType}`);
      return res.status(500).json({ error: 'Server error' });
    }

    const { error, value } = schema.validate(paramValue);

    if (error) {
      logger.warn(`Parameter validation error: ${error.message}`);
      return res.status(400).json({ error: 'Invalid parameter' });
    }

    req.validatedParams = req.validatedParams || {};
    req.validatedParams[paramType] = value;
    next();
  };
};

module.exports = { validate, validateParams };