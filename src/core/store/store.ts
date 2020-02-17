import { BehaviorSubject, Observable } from 'rxjs';
import { UiState, INIT_UI_STATE } from './states';

export class Store<T> {
    private state: BehaviorSubject<Readonly<T>>;
    private readonly initialState: T;

    protected constructor(initialStates: T) {
        this.initialState = initialStates;
        this.resetState();
    }

    public value(): T {
        if (this.state) return this.state.getValue();
        return null;
    }

    public get name(): string {
        return this.constructor.name;
    }

    public get state$(): Observable<Readonly<T>> {
        return this.state.asObservable();
    }

    public setState(stateFn: (state: Readonly<T>) => T): void {
        const prevState = this.value();
        const newState = stateFn(this.value());

        if (prevState === newState)
            throw new Error(`Store ${this.name} should be immutable.`);

        if (!this.state) {
            this.state = new BehaviorSubject(newState);
            return;
        }

        this.state.next(newState);
    }

    public resetState(): void {
        this.setState(() => Object.assign({}, this.initialState));
    }

    public setLoading(loading: boolean): void {
        this.setState((state: (T & UiState) & any) => {
            return {
                ...state,
                ...INIT_UI_STATE,
                loading,
            };
        });
    }

    public setError(errorMessages?: string): void {
        this.setState((state: (T & UiState) & any) => {
            return {
                ...state,
                ...INIT_UI_STATE,
                errorMessages,
                error: true,
            };
        });
    }

    public resetUiState(): void {
        this.setState((state: (T & UiState) & any) => {
            return {
                ...state,
                ...INIT_UI_STATE,
            };
        });
    }
}
