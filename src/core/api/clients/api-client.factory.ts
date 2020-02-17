import { HttpHandler } from '@angular/common/http';
import { FabelioApiClient } from './api.client';
import { FabelioHttpFactory } from './http.factory';
import { ApiConfig } from './api-config';

export function FabelioApiClientFactory(handler: HttpHandler, config: ApiConfig) {
    return new FabelioApiClient(
      FabelioHttpFactory(handler, config.interceptors, config)
    );
}
