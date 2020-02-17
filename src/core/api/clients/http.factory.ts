import { HttpHandler, HttpInterceptor, HttpRequest, HttpBackend, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api-config';

class HttpInterceptingHandler implements HttpHandler {
    private chain: HttpHandler | null = null;

    constructor(private backend: HttpBackend, private interceptors: HttpInterceptor[]) {}

    public handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        if (!this.chain) {
            this.chain = this.interceptors.reduceRight((next: HttpHandler, interceptor: HttpInterceptor) => {
                return {
                    handle: (req: HttpRequest<any>) => interceptor.intercept(req, next),
                };
            }, this.backend);
        }

        return this.chain.handle(request);
    }
}

export function FabelioHttpFactory(
    handler: HttpHandler,
    interceptors: HttpInterceptor[] = [],
    config: ApiConfig = { endpoint: '' },
): HttpHandler {
    const endpointInterceptor: HttpInterceptor = {
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
            return next.handle(
                req.clone({ url: config.endpoint + req.url })
            );
        }
    };

    return new HttpInterceptingHandler(handler, [endpointInterceptor, ...interceptors]);
}
