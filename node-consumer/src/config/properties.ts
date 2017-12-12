import * as joi from 'joi';

const envVarsSchema = joi.object({
  PORT: joi.number()
    .default(3000),
  MONGO_URL: joi.string()
    .required(),
  KAFKA_URL: joi.string()
    .required(),
  KAFKA_GROUP_ID: joi.string()
    .required(),
  KAFKA_PARTITION: joi.number()
    .required()
}).unknown()
  .required();

const validation = joi.validate(process.env, envVarsSchema);
if (validation.error) {
  throw new Error(`Config validation error: ${validation.error.message}`);
}

const envVars = validation.value;

export const properties = {
  server: {
    port: envVars.PORT
  },
  mongo: {
    url: envVars.MONGO_URL
  },
  kafka: {
    url: envVars.KAFKA_URL,
    groupId: envVars.KAFKA_GROUP_ID,
    partition: envVars.KAFKA_PARTITION
  }
};