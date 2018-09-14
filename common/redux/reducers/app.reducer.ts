import { tassign } from 'tassign';
import { PayloadAction } from '../../models';

export class AppActionType {
  static SET_SERVICE_STATUS = '/application/set-service-status';
  static SET_UPDATABLE = '/application/set-updatable';
  static SET_PROTOCOL = '/application/set-protocol';
  static SET_NETWORK = '/application/set-network';
}

export interface AppState {
  updatable: string;
  serviceStatus: {
    [serviceName: string]: boolean
  };
  protocol: 'eth' | 'ont';
  network: 'mainNet' | 'testNet';
}

export const appInitialState: AppState = {
  updatable: undefined,
  serviceStatus: {},
  protocol: 'eth',
  network: 'testNet'
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

    default:
      return state;
  }
}
