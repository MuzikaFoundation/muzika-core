import {Injectable} from '@angular/core';
import {promisify} from '@muzika/core';
import {from, Observable} from 'rxjs';
import {Dispatcher} from '../contracts/interface/Dispatcher';
import {MuzikaPaperContract} from '../contracts/interface/MuzikaPaperContract';
import {ExtendedWeb3} from './extended-web3.provider';

@Injectable({providedIn: 'root'})
export class MuzikaContractService {
  constructor(private web3: ExtendedWeb3,
              private dispatcher: Dispatcher,
              private muzikaPaper: MuzikaPaperContract) {
  }

  /**
   * Create new MuzikaPaperContract
   *
   * @param {string} seller
   * @param {string | number} price
   * @param {string} ipfsFileHash
   * @param {string} originalFileHash
   * @param {string | number} gasPrice
   * @returns {Observable<string>} returns txHash
   */
  createNewPaperContract(seller: string,
                         price: string | number,
                         ipfsFileHash: string,
                         originalFileHash: string,
                         gasPrice?: string | number): Observable<string> {
    return from(this._createPaperContract(seller, price, ipfsFileHash, originalFileHash, gasPrice));
  }

  private async _createPaperContract(seller: string,
                                     price: string | number,
                                     ipfsFileHash: string,
                                     originalFileHash: string,
                                     gasPrice?: string | number): Promise<string> {
    /* Generate txData for creating paper contract */

    /* Get accounts */
    // const accounts = await promisify(this.web3.eth.getAccounts);

    /* Detect network automatically (set to networkId) */
    await this.dispatcher.detectNetwork();
    await this.muzikaPaper.detectNetwork();

    /* creating contract function (web3.eth.contract.new()) calls callback twice
     * (https://github.com/ethereum/wiki/wiki/JavaScript-API#returns-49, show `myContractReturned = ...
     * So, is it correct that use promisify function?
     */
    // Link Library before deploy
    this.muzikaPaper.link('LibPaperPaymentInterface', this.dispatcher.address);
    const contract = this.web3.eth.contract(this.muzikaPaper.abi);
    const data = (<any>contract).new.getData(
      seller, price, ipfsFileHash, originalFileHash,
      {data: this.muzikaPaper.binary}
    );
    const gas = await promisify(this.web3.eth.estimateGas, {data}) + 30000;
    gasPrice = gasPrice || '14000000000'; // 14Gwei

    return await promisify(this.web3.eth.sendTransaction, {
      from: seller,
      data, gas, gasPrice
    });
  }
}
