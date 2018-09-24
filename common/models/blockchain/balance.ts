import BigNumber from 'bignumber.js';

export type AccountBalanceType = string | BigNumber | number;

export interface AccountBalance {
  // for ethereum protocol
  eth?: AccountBalanceType;

  // for ontology protocol
  ont?: AccountBalanceType;
  ong?: AccountBalanceType;

  // for muzika
  mzk?: AccountBalanceType;
  loyalty?: AccountBalanceType;

  // for etc or future
  [balanceType: string]: AccountBalanceType;
}
