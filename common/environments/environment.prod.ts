import { EnvironmentType, EnvironmentTypeV2 } from './env_types';

export const environmentProd: EnvironmentType = {
  production: true,
  base_api_url: 'https://py-stage.muzikacoin.io/api',
  env: 'prod',
  infuraAccessToken: 'nCLC9iatDyYYhUaFCPkZ',
  rpcUrl: 'https://mainnet.infura.io',
  networkId: 1,
};

export const environmentProdV2: EnvironmentTypeV2 = {
  production: true,
  base_api_url: 'https://py-stage.muzikacoin.io/api',
  env: 'prod',
  protocol: {
    eth: {
      mainNet: {
        rpcUrl: 'https://mainnet.infura.io',
        infuraAccessToken: 'nCLC9iatDyYYhUaFCPkZ',
        networkId: 1
      },
      testNet: {
        rpcUrl: 'https://ropsten.infura.io',
        infuraAccessToken: 'BHFyoHFDkG2NGioaIlf4',
        networkId: 3
      }
    },
    ont: {
      mainNet: {
        rpcUrl: 'dappnode1.ont.io',
        port: 20336
      },
      testNet: {
        rpcUrl: 'polaris1.ont.io',
        port: 20336
      }
    }
  }
};
