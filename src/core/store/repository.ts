import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { Store } from './store';
import { Observable } from 'rxjs';
import { UiState } from './states';

export class Repository<T> {
    protected constructor(private store: Store<T>) {}

    public select<R>(project: (state: T) => R): Observable<R> {
        return this.store.state$.pipe(
            map(project),
            distinctUntilChanged(),
        );
    }

    public selectOnce<R>(project: (state: T) => R): Observable<R> {
        return this.select(project).pipe(take(1));
    }

    public snapshot(): T {
        return this.store.value();
    }

    public isLoading$(): Observable<boolean> {
        return this.select((state: T & UiState) => state.loading);
    }

    public isError$(): Observable<boolean> {
        return this.select((state: T & UiState) => state.error);
    }

    public selectMessage$(): Observable<string> {
        return this.select((state: T & UiState) => state.errorMessages);
    }

    public selectUi$(): Observable<UiState> {
        return this.select(({loading, error, errorMessages}: T & UiState) => ({loading, error, errorMessages}));
    }

}
