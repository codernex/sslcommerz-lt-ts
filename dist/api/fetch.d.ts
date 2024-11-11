export type RequestMethod = 'POST' | 'PUT' | 'PATCH' | 'UPDATE' | 'GET';
interface IFetch<TData extends unknown> {
    url: string;
    method?: RequestMethod;
    data?: TData;
}
export declare const httpCall: <T, TData extends unknown = {}>({ method, data, url, }: IFetch<TData>) => Promise<T>;
export {};
//# sourceMappingURL=fetch.d.ts.map