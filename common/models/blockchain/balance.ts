import BigNumber from 'bignumber.js';

export interface AccountBalance {
  // for ethereum protocol
  eth?: string | BigNumber | number;
  ont?: string | BigNumber | number;

  // for ontology protocol
  ong?: string | BigNumber | number;

  // for muzika
  mzk?: string | BigNumber | number;
  loyalty?: string | BigNumber | number;

  // for etc or future
  [balanceType: string]: string | BigNumber | number;
}
