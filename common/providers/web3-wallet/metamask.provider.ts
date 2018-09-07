import {Provider as Web3Provider} from '@0xproject/types';

declare const window;

export class MetamaskProvider implements Web3Provider {
  private _provider: Web3Provider;

  constructor() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (window !== undefined && typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._provider = window.web3.currentProvider;
    } else {
      throw new Error('No web3? You should consider trying MetaMask!');
    }
  }

  send(...args): any {
    return (<any>this._provider).send.apply(this._provider, args);
  }

  sendAsync(...args): void {
    this._provider.sendAsync.apply(this._provider, args);
  }
}
