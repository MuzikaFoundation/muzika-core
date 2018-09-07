import {Provider} from '@0xproject/types';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as Web3 from 'web3';


@Injectable({providedIn: 'root'})
export class ExtendedWeb3 extends Web3 {
  private _providerChange: BehaviorSubject<Provider> = new BehaviorSubject<Provider>(null);

  constructor() {
    super(null);
  }

  public setProvider(provider: Provider): void {
    const currentProvider = (<any>this).currentProvider;
    if (currentProvider && currentProvider.stop) {
      currentProvider.stop();
    }

    super.setProvider(provider);
    this._providerChange.next(provider);
  }

  public onProviderChange(): Observable<Provider> {
    return this._providerChange.asObservable();
  }
}
