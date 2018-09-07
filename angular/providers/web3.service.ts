import {Provider as Web3Provider} from '@0xproject/types';
import {Injectable, Inject} from '@angular/core';
import {EnvironmentType, MetamaskProvider, RPCProvider, LedgerProvider, WalletProvider, AddressOnlyProvider, promisify} from '@muzika/core';
import {Observable, from, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {EnvironmentToken} from '../config/injection.tokens';
import {MuzikaCoin} from '../contracts/interface/MuzikaCoin';
import {ExtendedWeb3} from './extended-web3.provider';

@Injectable({providedIn: 'root'})
export class MuzikaWeb3Service {
  constructor(private web3: ExtendedWeb3,
              private muzikaCoin: MuzikaCoin,
              @Inject(EnvironmentToken) private environment: EnvironmentType,
              @Inject('RPC_URL') private rpcUrl: string) {
  }

  public usingMetamask(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      try {
        this._providerHandle(new MetamaskProvider(), observer);
      } catch (e) {
        observer.error(e);
      }
    });
  }

  public usingGanache(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      try {
        this._providerHandle(new RPCProvider(this.rpcUrl), observer);
      } catch (e) {
        observer.error(e);
      }
    });
  }

  public usingLedger(accountsOffset?: number, accountsLength: number = 1, path: string = `44'/60'/0'/0`): Observable<string[]> {
    return new Observable(observer => {
      try {
        const provider = new LedgerProvider({
          accountsLength,
          accountsOffset: accountsOffset || 0,
          path,
          networkId: this.environment.networkId,
        }, this.rpcUrl);

        this._providerHandle(provider, observer);
      } catch (e) {
        observer.error(e);
      }
    });
  }

  public usingKeystore(file: File, password: string): Observable<string[]> {
    return new Observable<string[]>(observer => {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          const input = reader.result;

          try {
            this._providerHandle(new WalletProvider({input, password}, this.rpcUrl), observer);
          } catch (e) {
            observer.error(e);
          }
        };

        reader.readAsText(file);
      } catch (e) {
        observer.error(e);
      }
    });
  }

  public usingPrivateKey(privateKey: string): Observable<string[]> {
    return new Observable(observer => {
      try {
        this._providerHandle(new WalletProvider(privateKey, this.rpcUrl), observer);
      } catch (e) {
        observer.error(e);
      }
    });
  }

  public usingAddressDirect(address: string): Observable<string[]> {
    return new Observable(observer => {
      try {
        this._providerHandle(new AddressOnlyProvider(address, this.rpcUrl), observer);
      } catch (e) {
        observer.error(e);
      }
    });
  }

  public getTransactions(address: string): Observable<any[]> {
    const transferHash = this.web3.sha3('Transfer(address,address,uint256)');

    // Padding zeros to left (length of data set to 32 bytes)
    address = '0x' + (<any>this.web3).padLeft(address.replace('0x', ''), 64);
    const filter = this.web3.eth.filter({
      // @TODO fromBlock must be the number of block at which MuzikaCoin is created
      fromBlock: 0,
      toBlock: 'latest',
      address: this.muzikaCoin.address,
      // Transfer `address` to another
      topics: [transferHash, address]
      // Receive Tokens Events
      // topics: [transferHash, null, address]
    });

    return from(promisify(filter.get)).pipe(
      map(
        events => events.map(event => {
          return {
            from: event.topics[1],
            to: event.topics[2],
            amount: this.web3.toBigNumber(event.data).toString()
          };
        })
      )
    );
  }

  private _providerHandle(provider: Web3Provider, observer: Observer<string[]>) {
    this.web3.setProvider(provider);

    promisify(this.web3.eth.getAccounts).then(accounts => {
      if (!accounts || accounts.length === 0) {
        observer.error(new Error('Accounts does not be available'));
        return;
      }

      observer.next(accounts);
      observer.complete();
    }).catch(e => {
      observer.error(e);
    });
  }
}
