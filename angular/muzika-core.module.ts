import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicationModule, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import {
  environmentDev,
  environmentDevV2,
  environmentProd,
  environmentProdV2,
  environmentStage,
  environmentStageV2,
  EnvironmentType, EnvironmentTypeV2
} from '@muzika/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BASE_API_URL, EnvironmentToken, EnvironmentTypeToken, EnvironmentV2Token } from './config/injection.tokens';
import { JWTInterceptor } from './config/jwt-interceptor';
import { ContractProviders } from './contracts/index';
import { FileBaseNamePipe, ObjectIteratorPipe } from './pipes';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    BrowserTransferStateModule,
    HttpClientModule,
    StoreModule
  ],
  declarations: [
    PaginationComponent,
    FileBaseNamePipe,
    ObjectIteratorPipe
  ],
  exports: [
    CommonModule,
    ApplicationModule,
    PaginationComponent,
    FileBaseNamePipe,
    ObjectIteratorPipe
  ],
  providers: [
    ...ContractProviders,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    {
      provide: EnvironmentToken,
      useFactory: (environmentType: string) => {
        return {
          dev: environmentDev,
          stage: environmentStage,
          prod: environmentProd
        }[environmentType] || environmentDev;
      },
      deps: [[EnvironmentTypeToken]]
    },
    {
      provide: EnvironmentV2Token,
      useFactory: (environmentType: string) => {
        return {
          dev: environmentDevV2,
          stage: environmentStageV2,
          prod: environmentProdV2
        }[environmentType] || environmentDevV2;
      },
      deps: [[EnvironmentTypeToken]]
    },
    {
      provide: 'RPC_URL',
      useFactory: (environment: EnvironmentType) => {
        return `${environment.rpcUrl}/${environment.infuraAccessToken}`;
      },
      deps: [[EnvironmentToken]]
    },
    {
      provide: BASE_API_URL,
      useFactory: (environment: EnvironmentTypeV2) => {
        return environment.base_api_url;
      },
      deps: [[EnvironmentV2Token]]
    }
  ]
})
export class MuzikaCoreModule {
  constructor(@Inject(PLATFORM_ID) private platformId: string,
              private transferState: TransferState) {
  }
}
