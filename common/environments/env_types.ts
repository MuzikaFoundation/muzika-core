export interface EnvironmentType {
  production: boolean;
  base_api_url: string;
  env: 'dev' | 'prod' | 'stage';
  infuraAccessToken: string;
  rpcUrl: string;
  networkId: number;
}


