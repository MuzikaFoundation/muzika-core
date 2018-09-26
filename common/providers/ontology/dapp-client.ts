
import {
  Asset,
  OntIdDDO,
  OntIdAttribute,
  Signature,
  Balance,
  Block,
  MerkleProof,
  Network,
  Transaction,
  Parameter,
  Response,
  Provider
} from 'ontology-dapi';

/**
 * This is an abstract class for dapp client that asynchronously request to
 * provider is not implemented. Since `Client` in ontology-dapi module already
 * implements the request to provider, this class is useful for the custom
 * implementation for it. (It's the same interface with client in ontology-
 * dapi)
 */
export class OntologyDappClient {

  // If you want to use custom function instead of `sendAsync` function, please
  // overwrite the specific function you want like following in constructor.
  //
  // Ex) Use custom function instead of `sendAsync` in `getAccount` api.
  // >> api: any = {
  // >>   asset: {
  // >>     getAccount: (): Promise<string> => { ... }
  // >>   }
  // >> }
  api: any = {};

  constructor() {
    /**
     * All API functions that are not defined in `this.api` is default call
     * `this.sendAsync` function with method name and arguments.
     */
    this.api = Object.assign({
      asset: {
        getAccount: (): Promise<string> => this.sendAsync('asset.getAccount'),
        makeTransfer: (
          { recipient, asset, amount }: { recipient: string, asset: Asset, amount: number }
        ): Promise<string> => this.sendAsync('asset.makeTransfer', { recipient, asset, amount })
      },

      identity: {
        getIdentity: (): Promise<string> => this.sendAsync('identity.getIdentity'),
        getDDO: (
          { identity }: { identity: string }
        ): Promise<OntIdDDO> => this.sendAsync('identity.getDDO', { identity }),
        addAttributes: (
          { attributes }: { attributes: OntIdAttribute[] }
        ): Promise<void> => this.sendAsync('identity.addAttributes', { attributes }),
        removeAttribute: (
          { key }: { key: string }
        ): Promise<void> => this.sendAsync('identity.removeAttributes', { key })
      },

      message: {
        signMessage: (
          { message }: { message: string }
        ): Promise<Signature> => this.sendAsync('message.signMessage', { message }),
        verifyMessage: (
          { message, signature }: { message: string, signature: Signature }
        ): Promise<boolean> => this.sendAsync('message.verifyMessage', { message, signature }),
        signMessageHash: (
          { messageHash }: { messageHash: string }
        ): Promise<Signature> => this.sendAsync('message.signMessageHash', { messageHash }),
        verifyMessageHash: (
          { messageHash, signature }: { messageHash: string, signature: Signature }
        ): Promise<boolean> => this.sendAsync('message.verifyMessageHash', { messageHash, signature })
      },

      network: {
        getAllowance: (
          { asset, fromAddress, toAddress }: { asset: Asset, fromAddress: string, toAddress: string }
        ): Promise<number> => this.sendAsync('network.getAllowance', { asset, fromAddress, toAddress }),
        getBalance: (
          { address }: { address: string }
        ): Promise<Balance> => this.sendAsync('network.getBalance', { address }) ,
        getBlock: (
          { block }: { block: number | string }
        ): Promise<Block> => this.sendAsync('network.getBlock', { block }),
        getBlockHeight: (): Promise<number> => this.sendAsync('network.getBlockHeight'),
        getMerkleProof: (
          { txHash }: { txHash: string }
        ): Promise<MerkleProof> => this.sendAsync('network.getMerkleProof'),
        getNetwork: (): Promise<Network> => this.sendAsync('network.getNetwork'),
        getNodeCount: (): Promise<number> => this.sendAsync('network.getNodeCount'),
        getStorage: (
          { contract, key }: { contract: string, key: string }
        ): Promise<string> => this.sendAsync('network.getStorage', { contract, key }),
        getTransaction: (
          { txHash }: { txHash: string }
        ): Promise<Transaction> => this.sendAsync('network.getTransaction', { txHash }),
        isConnected: (): Promise<boolean> => this.sendAsync('network.isConnected')
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
        ): Promise<Response> => this.sendAsync('smartContract.invoke', {
          contract, method, parameters, gasPrice, gasLimit, requireIdentity
        }),

        invokeRead: (
          { contract, method, parameters }: {
            contract: string,
            method: string,
            parameters: Parameter[]
          }
        ): Promise<any> => this.sendAsync('smartContract.invokeRead', { contract, method, parameters }),

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
        ): Promise<any> => this.sendAsync('smartContract.deploy', {
          code, name, version, author, email, description, needStorage, gasPrice, gasLimit
        })
      },

      provider: {
        getProvider: (): Promise<Provider> => this.sendAsync('provider.getProvider')
      }
    }, this.api);
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Sends a request to the provider asynchronously. This is not implemented
   * in this class, so you should implement this.
   *
   * @param method API method name.
   * @param argument API arguments.
   */
  async sendAsync(method: string, argument?: any): Promise<any> {
    throw new Error('Not implemented');
  }
}
