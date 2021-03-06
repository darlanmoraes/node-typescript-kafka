import * as joi from 'joi';

const envVarsSchema = joi.object({
  PORT: joi.number()
    .default(3000),
  MONGO_URL: joi.string()
    .default('mongodb://localhost:27017/db'),
  KAFKA_URL: joi.string()
    .default('kafka:9092')
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
    url: envVars.KAFKA_URL
  }
};