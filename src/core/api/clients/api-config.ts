import { HttpInterceptor } from '@angular/common/http';

export class ApiConfig {
    endpoint: string;
    interceptors?: Array<HttpInterceptor>;
}
