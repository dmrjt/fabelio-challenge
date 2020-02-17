import { UnaryFunction, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export function mapToArrayClass<T>(type: new () => T): UnaryFunction<Observable<any>, Observable<T[]>> {
    return pipe(
        map(data => {
            if (Array.isArray(data)) {
                return plainToClass(type, data);
            }

            throw new Error('The data is not an array');
        }),
    );
}

export function mapToClass<T>(type: new () => T): UnaryFunction<Observable<any>, Observable<T>> {
    return pipe(
        map(data => {
            if (!Array.isArray(data)) {
                return plainToClass(type, data as T);
            }

            throw new Error('The data is an array');
        }),
    );
}
