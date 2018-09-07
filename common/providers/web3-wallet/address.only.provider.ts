import {Provider as Web3Provider} from '@0xproject/types';
import * as ProviderEngine from 'web3-provider-engine';
import * as HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet';
import * as RpcSubprovider from 'web3-provider-engine/subproviders/rpc';
import {DEFAULT_RPC_URL} from '../../config';

export class AddressOnlyProvider implements Web3Provider {
  private engine: ProviderEngine;

  constructor(walletAddress: string,
              providerUrl?: string) {
    const rpcProvider = new RpcSubprovider({
      rpcUrl: providerUrl || DEFAULT_RPC_URL
    });

    this.engine = new ProviderEngine({pollingInterval: 10000});
    this.engine.addProvider(new HookedWalletSubprovider({
      getAccounts: ((cb: (err: any, accounts: string[]) => void) => {
        cb(null, [walletAddress]);
      }),
      signTransaction: (cb => {
        throw new Error('This is for address viewer. Signing is not supported.');
      })
    }));
    this.engine.addProvider(rpcProvider);
    this.engine.start(); // Required by the provider engine.
  }

  sendAsync(...args) {
    this.engine.sendAsync.apply(this.engine, args);
  }

  send(...args): any {
    return this.engine.send.apply(this.engine, args);
  }

  stop(): void {
    this.engine.stop();
  }
}
