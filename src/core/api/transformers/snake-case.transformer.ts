export function toSnake(data: any): any {
    if (data instanceof FormData) {
        const arr: any[] = Array.from((data as any).entries());

        return arr.reduce((acc, [key, val]) => {
            const newKey = key.replace(/([A-Z])/g, (m: string) => '_' + m.toLowerCase());
            if (val) {
                if (val instanceof File) {
                    acc.append(newKey, val, val.name);
                } else {
                    acc.append(newKey, val);
                }
            }

            return acc;
        }, new FormData());
    }
    if (data instanceof Date || data instanceof Boolean || data instanceof String) {
        return data;
    }
    if (data instanceof Array) {
        return data.map((item: any) => toSnake(item));
    }

    if (null !== data && 'object' === typeof data) {
        const transformed: any = {};
        Object.keys(data).forEach((key: any) => {
            let transformedKey = key;
            let transformedItem = data[key];

            if ('string' === typeof transformedKey) {
                transformedKey = transformedKey.replace(/([A-Z])/g, (m: string) => '_' + m.toLowerCase());
            }

            if ('object' === typeof transformedItem) {
                transformedItem = toSnake(transformedItem);
            }

            transformed[transformedKey] = transformedItem;
        });

        return transformed;
    }

    return data;
}
