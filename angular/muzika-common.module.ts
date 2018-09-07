import {NgModule} from '@angular/core';
import {JsonIconComponent} from './components/json-icon/json-icon.component';
import {LedgerIconComponent} from './components/ledger-icon/ledger-icon.component';
import {MuzikaIconComponent} from './components/muzika-icon/muzika-icon.component';
import {TrezorIconComponent} from './components/trezor-icon/trezor-icon.component';

@NgModule({
  declarations: [
    LedgerIconComponent,
    JsonIconComponent,
    MuzikaIconComponent,
    TrezorIconComponent
  ],
  exports: [
    LedgerIconComponent,
    JsonIconComponent,
    MuzikaIconComponent,
    TrezorIconComponent
  ]
})
export class MuzikaCommonModule {
}
