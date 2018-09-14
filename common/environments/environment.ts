import { EnvironmentType, EnvironmentTypeV2 } from './env_types';

export const environmentDev: EnvironmentType = {
  production: false,
  base_api_url: 'http://127.0.0.1:7001/api',
  env: 'dev',
  infuraAccessToken: '',
  rpcUrl: 'http://localhost:8545',
  networkId: 5777,
};

export const environmentDevV2: EnvironmentTypeV2 = {
  production: false,
  base_api_url: 'http://127.0.0.1:7001/api',
  env: 'dev',
  protocol: {
    eth: {
      mainNet: {
        rpcUrl: 'https://mainnet.infura.io',
        infuraAccessToken: 'nCLC9iatDyYYhUaFCPkZ',
        networkId: 1
      },
      testNet: {
        rpcUrl: 'http://localhost:8545',
        infuraAccessToken: '',
        networkId: 5777
      }
    },
    ont: {
      mainNet: {
        rpcUrl: 'dappnode1.ont.io',
        port: 20336
      },
      testNet: {
        rpcUrl: 'localhost',
        port: 20336
      }
    }
  }
};
