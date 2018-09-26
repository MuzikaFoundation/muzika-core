import { tassign } from 'tassign';
import { EthereumWalletItem, NetworkType, OntologyWalletItem, PayloadAction, ProtocolType } from '../../models';

export class AppActionType {
  static SET_SERVICE_STATUS = '/application/set-service-status';
  static SET_UPDATABLE = '/application/set-updatable';
  static SET_PROTOCOL = '/application/set-protocol';
  static SET_NETWORK = '/application/set-network';
  static SET_CURRENT_WALLET = '/application/set-current-wallet';
  static SET_WALLET_PASSWORD = '/application/set-password';
}

export interface AppState {
  updatable: string;
  serviceStatus: {
    [serviceName: string]: boolean
  };
  protocol: ProtocolType;
  network: NetworkType;
  currentWallet: EthereumWalletItem | OntologyWalletItem | null;
  currentWalletPassword: string;
}

export const appInitialState: AppState = {
  updatable: undefined,
  serviceStatus: {},
  protocol: 'eth',
  network: 'testNet',
  currentWallet: null,
  currentWalletPassword: ''
};

export function AppReducer(state: AppState = appInitialState, action: PayloadAction): AppState {
  switch (action.type) {
    case AppActionType.SET_UPDATABLE:
      return tassign(state, {
        updatable: action.payload.updatable
      });

    case AppActionType.SET_SERVICE_STATUS:
      return tassign(state, {
        serviceStatus: tassign(state.serviceStatus, {
          [action.payload.serviceName]: action.payload.status
        })
      });

    case AppActionType.SET_PROTOCOL:
      return tassign(state, {
        protocol: action.payload.protocol,
        network: action.payload.network || state.network
      });

    case AppActionType.SET_NETWORK:
      return tassign(state, {
        network: action.payload.network
      });

    case AppActionType.SET_CURRENT_WALLET:
      return tassign(state, {
        currentWallet: action.payload.wallet
      });

    case AppActionType.SET_WALLET_PASSWORD:
      return tassign(state, {
        currentWalletPassword: action.payload.password
      });

    default:
      return state;
  }
}
