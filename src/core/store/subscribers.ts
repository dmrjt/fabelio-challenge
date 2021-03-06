import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Subscribers {
    private ctx: object[] = [];
    private subscriptions: { [key: string]: Subscription[] } = {};

    public subscribe(ctx: object, observable: Observable<any>): Subscription {
        const sub = observable.subscribe();
        let index = this.ctx.indexOf(ctx);

        if (-1 === index) {
            index = this.ctx.push(ctx) - 1;
        }

        if (!this.subscriptions[index]) {
            this.subscriptions[index] = [];
        }

        this.subscriptions[index].push(sub);

        return sub;
    }

    public flush(ctx: object): void {
        const index = this.ctx.indexOf(ctx);

        if (this.subscriptions[index] instanceof Array) {
            this.subscriptions[index].forEach((sub: Subscription) => {
                sub.unsubscribe();
            });

            this.ctx.splice(index, 1);
            delete this.subscriptions[index];
        }
    }
}
