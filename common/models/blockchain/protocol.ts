
export type ProtocolType = 'eth' | 'ont';
export type NetworkType = 'mainNet' | 'testNet';

export interface BlockChainProtocol {
  protocol: ProtocolType;
  network: NetworkType;
}
