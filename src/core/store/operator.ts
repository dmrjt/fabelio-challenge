import { Observable, of } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Store } from './store';
import { UiState } from './states';

export function interactWithUi(store: Store<any & UiState>, project: Observable<any>): Observable<any> {
    return of(null).pipe(
        tap(() => {
            store.resetUiState();
            store.setLoading(true);
        }),
        switchMap(() => project),
        finalize(() => store.setLoading(false)),
    );
}
