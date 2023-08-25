import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import log from './log';

dotenv.config();

const region = 'us-west-2';
const ssm = new AWS.SSM({ region });

const parameterNames = [
  'WAFCONNECT_MONGODB_URI',
  'WAFCONNECT_PORT',
  'WAFCONNECT_PUBLIC_APP_TOKEN',
  'WAFCONNECT_REDIS_URI',
];

export const loadEnvironmentVariables = () => {
  if (process.env.NODE_ENV === 'development') {
    log.info('loading production variables');
    return new Promise<void>((resolve, reject) => {
      ssm.getParameters(
        { Names: parameterNames, WithDecryption: true },
        (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          const parameters = data.Parameters;
          if (!parameters || parameters.length === 0) {
            reject(new Error('No parameters found.'));
            return;
          }

          parameters.forEach((parameter) => {
            const name = parameter.Name; // Remove the path from the parameter name
            const value = parameter.Value;
            if (name && value) {
              process.env[name] = value;
              log.info('the environmental variable is ', value);
            }
          });

          resolve();
        }
      );

      log.info('process env files', process.env.WAFCONNECT_PORT);
    });
  } else {
    log.info('loading development variables');
  }
};
