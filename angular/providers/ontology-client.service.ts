import { Injectable } from '@angular/core';
import { OntologyDappClient, OntologyDappProvider } from '@muzika/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class OntologyClient extends OntologyDappClient {
  private _providerChange: BehaviorSubject<OntologyDappProvider> = new BehaviorSubject<OntologyDappProvider>(null);
  private currentProvider: OntologyDappProvider;

  constructor() {
    super();
  }

  async sendAsync(method: string, argument?: any): Promise<any> {
    return await this.currentProvider.sendAsync(method, argument);
  }

  setProvider(provider: OntologyDappProvider) {
    this.currentProvider = provider;
    this._providerChange.next(this.currentProvider);
  }

  public onProviderChange(): Observable<OntologyDappProvider> {
    return this._providerChange.asObservable();
  }
}
