import { Inject, Injectable } from '@angular/core';
import { RpcClient } from 'ontology-ts-sdk';
import { EnvironmentV2Token } from '../config';
import { EnvironmentTypeV2 } from '@muzika/core';


@Injectable({providedIn: 'root'})
export class OntologyClient extends RpcClient {
  private _network: 'mainNet' | 'testNet';

  constructor(
    @Inject(EnvironmentV2Token) private environment: EnvironmentTypeV2
  ) {
    super(null);
  }

  set network(networkType: 'mainNet' | 'testNet') {
    const protocolInfo = this.environment.protocol.ont[networkType];
    this.url = `${protocolInfo.rpcUrl}:${protocolInfo.port}`;
    this._network = networkType;
  }

  get network(): 'mainNet' | 'testNet' {
    return this._network;
  }
}
