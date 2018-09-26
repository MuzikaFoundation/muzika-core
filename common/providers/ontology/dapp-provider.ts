import {
  Asset,
  Balance,
  Block,
  MerkleProof,
  Network,
  OntIdAttribute,
  OntIdDDO,
  Parameter, Provider,
  Signature,
  Response,
  Transaction,
} from 'ontology-dapi';
import { RpcClient, Crypto } from 'ontology-ts-sdk';

function UNSUPPORTED_FUNCTION(methodName): any {
  throw new Error(`Unsupported or not implemented method (${methodName})`);
}

export class OntologyDappSubProvider {
  api: any = {};

  constructor (api?: any) {
    this.api = api;
  }

  /**
   * Sends a request to this provider and get response.
   *
   * @param method API method name.
   * @param argument API argument.
   */
  sendAsync(method: string, argument: any): Promise<any> {
    const [ methodName, funcName, ...args ] = method.split('.');

    if (args.length > 0) {
      throw new Error('unsupported dapi method');
    }

    return this.api[methodName][funcName](argument);
  }
}


/**
 * This is an abstract class for dapp provider that request from client is
 * not implemented.
 */
export class OntologyDappProvider extends OntologyDappSubProvider {
  constructor(api?: any) {
    super(api);
    /**
     * All API functions that are not defined in `this.api` is default throw
     * unsupported error.
     */
    this.api = Object.assign({
      asset: {
        getAccount: (): Promise<string> => this.getAccount(),
        makeTransfer: (
          { recipient, asset, amount }: { recipient: string, asset: Asset, amount: number }
        ): Promise<string> => this.makeTransfer({ recipient, asset, amount })
      },

      identity: {
        getIdentity: (): Promise<string> => this.getIdentity(),
          getDDO: (
          { identity }: { identity: string }
        ): Promise<OntIdDDO> => this.getDDO({ identity }),
          addAttributes: (
          { attributes }: { attributes: OntIdAttribute[] }
        ): Promise<void> => this.addAttributes({ attributes }),
          removeAttribute: (
          { key }: { key: string }
        ): Promise<void> => this.removeAttribute({ key })
      },

      message: {
        signMessage: (
          { message }: { message: string }
        ): Promise<Signature> => this.signMessage({ message }),
          verifyMessage: (
          { message, signature }: { message: string, signature: Signature }
        ): Promise<boolean> => this.verifyMessage({ message, signature }),
          signMessageHash: (
          { messageHash }: { messageHash: string }
        ): Promise<Signature> => this.signMessageHash({ messageHash }),
          verifyMessageHash: (
          { messageHash, signature }: { messageHash: string, signature: Signature }
        ): Promise<boolean> => this.verifyMessageHash({ messageHash, signature })
      },

      network: {
        getAllowance: (
          { asset, fromAddress, toAddress }: { asset: Asset, fromAddress: string, toAddress: string }
        ): Promise<number> => this.getAllowance({ asset, fromAddress, toAddress }),
          getBalance: (
          { address }: { address: string }
        ): Promise<Balance> => this.getBalance({ address }),
          getBlock: (
          { block }: { block: number | string }
        ): Promise<Block> => this.getBlock({ block }),
          getBlockHeight: (): Promise<number> => this.getBlockHeight(),
          getMerkleProof: (
          { txHash }: { txHash: string }
        ): Promise<MerkleProof> => this.getMerkleProof({ txHash }),
          getNetwork: (): Promise<Network> => this.getNetwork(),
          getNodeCount: (): Promise<number> => this.getNodeCount(),
          getStorage: (
          { contract, key }: { contract: string, key: string }
        ): Promise<string> => this.getStorage({ contract, key }),
          getTransaction: (
          { txHash }: { txHash: string }
        ): Promise<Transaction> => this.getTransaction({ txHash }),
          isConnected: (): Promise<boolean> => this.isConnected()
      },

      smartContract: {
        invoke: (
          { contract, method, parameters, gasPrice, gasLimit, requireIdentity }: {
            contract: string,
            method: string,
            parameters?: Parameter[],
            gasPrice?: number,
            gasLimit?: number,
            requireIdentity?: boolean
          }
        ): Promise<Response> => this.invoke({ contract, method, parameters, gasPrice, gasLimit, requireIdentity }),

          invokeRead: (
          { contract, method, parameters }: {
            contract: string,
            method: string,
            parameters: Parameter[]
          }
        ): Promise<any> => this.invokeRead({ contract, method, parameters }),

          deploy: (
          { code, name, version, author, email, description, needStorage, gasPrice, gasLimit }: {
            code: string,
            name?: string,
            version?: string,
            author?: string,
            email?: string,
            description?: string,
            needStorage?: boolean,
            gasPrice?: number,
            gasLimit?: number
          }
        ): Promise<any> => this.deploy({ code, name, version, author, email, description, needStorage, gasPrice, gasLimit })
      },

      provider: {
        getProvider: (): Promise<Provider> => this.getProvider()
      }
    }, this.api);
  }

  /**
   * Registers a sub-provider. If the sub-provider has already-implemented
   * functions in it, it will override the APIs.
   *
   * @param provider sub-provider.
   */
  registerProvider(provider: OntologyDappSubProvider) {
    this.api = Object.assign(this.api, provider.api);
  }

  /**
   * Sends a request to this provider and get response.
   *
   * @param method API method name.
   * @param argument API argument.
   */
  sendAsync(method: string, argument: any): Promise<any> {
    const [ methodName, funcName, ...args ] = method.split('.');

    if (args.length > 0) {
      throw new Error('unsupported dapi method');
    }

    return this.api[methodName][funcName](argument);
  }

  // noinspection JSMethodCanBeStatic
  getAccount(): Promise<string> {
    return UNSUPPORTED_FUNCTION('asset.getAccount');
  }

  // noinspection JSMethodCanBeStatic
  makeTransfer(
    { recipient, asset, amount }: { recipient: string, asset: Asset, amount: number }
  ): Promise<string> {
    return UNSUPPORTED_FUNCTION('asset.getAccount');
  }

  // noinspection JSMethodCanBeStatic
  getIdentity(): Promise<string> {
    return UNSUPPORTED_FUNCTION('identity.getIdentity');
  }

  // noinspection JSMethodCanBeStatic
  getDDO(
    { identity }: { identity: string }
  ): Promise<OntIdDDO> {
    return UNSUPPORTED_FUNCTION('identity.getDDO');
  }

  // noinspection JSMethodCanBeStatic
  addAttributes(
    { attributes }: { attributes: OntIdAttribute[] }
  ): Promise<void> {
    return UNSUPPORTED_FUNCTION('identity.addAttributes');
  }

  // noinspection JSMethodCanBeStatic
  removeAttribute(
    { key }: { key: string }
  ): Promise<void> {
    return UNSUPPORTED_FUNCTION('identity.removeAttributes');
  }

  // noinspection JSMethodCanBeStatic
  signMessage(
    { message }: { message: string }
  ): Promise<Signature> {
    return UNSUPPORTED_FUNCTION('message.signMessage');
  }

  // noinspection JSMethodCanBeStatic
  verifyMessage(
    { message, signature }: { message: string, signature: Signature }
  ): Promise<boolean> {
    return UNSUPPORTED_FUNCTION('message.verifyMessage');
  }

  // noinspection JSMethodCanBeStatic
  signMessageHash(
    { messageHash }: { messageHash: string }
  ): Promise<Signature> {
    return UNSUPPORTED_FUNCTION('message.signMessageHash');
  }

  // noinspection JSMethodCanBeStatic
  verifyMessageHash(
    { messageHash, signature }: { messageHash: string, signature: Signature }
  ): Promise<boolean> {
    return UNSUPPORTED_FUNCTION('message.verifyMessageHash');
  }

  // noinspection JSMethodCanBeStatic
  getAllowance(
    { asset, fromAddress, toAddress }: { asset: Asset, fromAddress: string, toAddress: string }
  ): Promise<number> {
    return UNSUPPORTED_FUNCTION('network.getAllowance');
  }

  // noinspection JSMethodCanBeStatic
  getBalance(
    { address }: { address: string }
  ): Promise<Balance> {
    return UNSUPPORTED_FUNCTION('network.getBalance');
  }

  // noinspection JSMethodCanBeStatic
  getBlock(
    { block }: { block: number | string }
  ): Promise<Block> {
    return UNSUPPORTED_FUNCTION('network.getBlock');
  }

  // noinspection JSMethodCanBeStatic
  getBlockHeight(): Promise<number> {
    return UNSUPPORTED_FUNCTION('network.getBlockHeight');
  }

  // noinspection JSMethodCanBeStatic
  getMerkleProof(
    { txHash }: { txHash: string }
  ): Promise<MerkleProof> {
    return UNSUPPORTED_FUNCTION('network.getMerkleProof');
  }

  // noinspection JSMethodCanBeStatic
  getNetwork(): Promise<Network> {
    return UNSUPPORTED_FUNCTION('network.getNetwork');
  }

  // noinspection JSMethodCanBeStatic
  getNodeCount(): Promise<number> {
    return UNSUPPORTED_FUNCTION('network.getNodeCount');
  }

  // noinspection JSMethodCanBeStatic
  getStorage(
    { contract, key }: { contract: string, key: string }
  ): Promise<string> {
    return UNSUPPORTED_FUNCTION('network.getStorage');
  }

  // noinspection JSMethodCanBeStatic
  getTransaction(
    { txHash }: { txHash: string }
  ): Promise<Transaction> {
    return UNSUPPORTED_FUNCTION('network.getTransaction');
  }

  // noinspection JSMethodCanBeStatic
  isConnected(): Promise<boolean> {
    return UNSUPPORTED_FUNCTION('network.isConnected');
  }

  // noinspection JSMethodCanBeStatic
  invoke(
    { contract, method, parameters, gasPrice, gasLimit, requireIdentity }: {
      contract: string,
      method: string,
      parameters?: Parameter[],
      gasPrice?: number,
      gasLimit?: number,
      requireIdentity?: boolean
    }
  ): Promise<Response> {
    return UNSUPPORTED_FUNCTION('smartContract.invoke');
  }

  // noinspection JSMethodCanBeStatic
  invokeRead(
    { contract, method, parameters }: {
      contract: string,
      method: string,
      parameters: Parameter[]
    }
  ): Promise<any> {
    return UNSUPPORTED_FUNCTION('smartContract.invokeRead');
  }

  // noinspection JSMethodCanBeStatic
  deploy(
    { code, name, version, author, email, description, needStorage, gasPrice, gasLimit }: {
      code: string,
      name?: string,
      version?: string,
      author?: string,
      email?: string,
      description?: string,
      needStorage?: boolean,
      gasPrice?: number,
      gasLimit?: number
    }
  ): Promise<any> {
    return UNSUPPORTED_FUNCTION('smartContract.deploy');
  }

  // noinspection JSMethodCanBeStatic
  getProvider(): Promise<Provider> {
    return UNSUPPORTED_FUNCTION('provider.getProvider');
  }
}

export class OntologyRpcSubProvider extends OntologyDappSubProvider {
  client: RpcClient;

  constructor (public rpcUrl?: string) {
    super({
      network: {
        getAllowance: (
          { asset, fromAddress, toAddress }: { asset: Asset, fromAddress: string, toAddress: string }
        ): Promise<number> => this.client.getAllowance(asset, new Crypto.Address(fromAddress), new Crypto.Address(toAddress)),
        getBalance: (
          { address }: { address: string }
        ): Promise<Balance> => this.client.getBalance(new Crypto.Address(address)),
        getBlock: (
          { block }: { block: number | string }
        ): Promise<Block> => this.client.getBlock(block),
        getBlockHeight: (): Promise<number> => this.client.getBlockHeight(),
        getMerkleProof: (
          { txHash }: { txHash: string }
        ): Promise<MerkleProof> => this.client.getMerkleProof(txHash),
        getNodeCount: (): Promise<number> => this.client.getNodeCount(),
        getStorage: (
          { contract, key }: { contract: string, key: string }
        ): Promise<string> => this.client.getStorage(contract, key),
        getTransaction: (
          { txHash }: { txHash: string }
        ): Promise<Transaction> => this.client.getRawTransactionJson(txHash)
      }
    });

    this.client = new RpcClient(rpcUrl);
  }

  setRpcUrl(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
    this.client.url = rpcUrl;
  }
}
