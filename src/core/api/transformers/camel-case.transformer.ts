export function toCamel(data: any): any {
    if (data instanceof Array) {
        return data.map((item: any) => toCamel(item));
    }

    if (null !== data && 'object' === typeof data) {
        const transformed: any = {};
        Object.keys(data).forEach((key: any) => {
            let transformedKey = key;
            let transformedItem = data[key];

            if ('string' === typeof transformedKey) {
                transformedKey = transformedKey.replace(/(\_\w)/g, (m: string) => m[1].toUpperCase());
            }

            if ('object' === typeof transformedItem) {
                transformedItem = toCamel(transformedItem);
            }

            transformed[transformedKey] = transformedItem;
        });

        return transformed;
    }

    return data;
}
