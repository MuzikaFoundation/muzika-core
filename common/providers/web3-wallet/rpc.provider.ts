import * as Web3 from 'web3';
import {Provider as Web3Provider} from '@0xproject/types';
import {DEFAULT_RPC_URL} from '../../config';

export class RPCProvider implements Web3Provider {
  private _provider: Web3Provider;

  constructor(host?: string) {
    if (!host) {
      host = DEFAULT_RPC_URL;
    }

    this._provider = new Web3.providers.HttpProvider(host);
  }

  send(...args): any {
    return (<any>this._provider).send.apply(this._provider, args);
  }

  sendAsync(...args): void {
    this._provider.sendAsync.apply(this._provider, args);
  }
}
