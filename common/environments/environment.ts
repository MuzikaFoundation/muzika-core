import {EnvironmentType} from './env_types';

export const environmentDev: EnvironmentType = {
  production: false,
  base_api_url: 'http://127.0.0.1:7001/api',
  env: 'dev',
  infuraAccessToken: '',
  rpcUrl: 'http://localhost:8545',
  networkId: 5777,
};
