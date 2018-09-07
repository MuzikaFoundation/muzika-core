/* tslint:disable */
import { BigNumber } from 'bignumber.js';
import { ContractAbi, TxData } from '@0xproject/types';

export type TxValue = number | string | BigNumber;
export type EtherInteger = number | string | BigNumber;
export type EtherAddress = string | BigNumber;

export type ITxParams = TxData;

// @TODO
export class TruffleContract<T extends TruffleContractInstance> {
  abi: ContractAbi;
  address: string;
  binary: string;
  deployedBinary: string;
  bytecode: string;
  deployedBytecode: string;

  /** @deprecated use bytecode */
  unlinked_binary: string;

  'new'(...args: any[]): Promise<T> {
    throw new Error('Not Implemented');
  }

  at(address: string): T {
    throw new Error('Not Implemented');
  }

  deployed(): Promise<T> {
    throw new Error('Not Implemented');
  }

  detectNetwork(): Promise<void> {
    throw new Error('Not Implemented');
  }

  setNetwork(networkID: number): void {
    throw new Error('Not Implemented');
  }

  resetAddress(): void {
    throw new Error('Not Implemented');
  }

  setProvider(provider: any): void {
    throw new Error('Not Implemented');
  }

  link(name: any, address: string): void {
    throw new Error('Not Implemented');
  }
}

// @TODO
export interface TruffleContractInstance {
  abi: ContractAbi;
  address: string;
  contract: any;

  sendTransaction(txParams: ITxParams): Promise<any>;
  send(value: EtherInteger): Promise<any>;
}

