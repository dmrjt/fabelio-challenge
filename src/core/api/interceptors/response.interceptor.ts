import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { toCamel } from '../transformers/camel-case.transformer';

@Injectable()
export class ResponseTransformerInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((response: any) => {
                if (response.body) {
                    return response.clone({ body: toCamel(response.body) });
                }

                return response;
            }),
        );
    }
}
