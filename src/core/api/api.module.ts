import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHandler } from '@angular/common/http';
import { FabelioApiClient } from './clients/api.client';
import { FabelioApiClientFactory } from './clients/api-client.factory';
import { ResponseTransformerInterceptor } from './interceptors/response.interceptor';
import { ApiConfig } from './clients/api-config';

@NgModule({
    imports: [ HttpClientModule ],
    exports: [ HttpClientModule ]
})
export class ApiModule {
    static forRoot(environment): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [
                {
                    provide: ApiConfig,
                    useValue: {
                        endpoint: environment.endpoint
                    },
                },
                {
                    provide: FabelioApiClient,
                    useFactory: FabelioApiClientFactory,
                    deps: [HttpHandler, ApiConfig]
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ResponseTransformerInterceptor,
                    multi: true
                },
            ]
        };
    }
}
