export interface EthereumWalletV3 {
  address: string;
  id: string;
  version: number;
  crypto: {
    cipher: string;
    ciphertext: string;
    cipherparams: {
      iv: string;
    };
    kdf: string;
    kdfparams: {
      dklen?: number;
      n?: number;
      p?: number;
      r?: number;
      [param: string]: any;
    };
    mac: string;
  };
}

export interface EthereumWalletItem {
  name: string;
  wallet?: EthereumWalletV3;
}

export interface OntologyAccount {
  address: string;
  'enc-alg': string;
  key: string;
  algorithm: string;
  salt: string;
  parameters: {
    [param: string]: string;
  };
  label: string;
  publicKey: string;
  signatureScheme: string;
  isDefault: boolean;
  lock: boolean;
}

export interface OntologyWalletItem {
  name: string;
  version: string;
  createTime: string;
  defaultAccountAddress: string;
  defaultOntid: string;
  identities: any[];
  scrypt: {
    p: number;
    n: number;
    r: number;
    dkLen: number;
  };
  accounts: OntologyAccount[];
}

export interface WalletInfo {
  name: string;
  address: string;
}
