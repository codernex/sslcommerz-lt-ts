import fetch from 'node-fetch';

export type RequestMethod = 'POST' | 'PUT' | 'PATCH' | 'UPDATE' | 'GET';

interface IFetch<TData extends unknown> {
  url: string;
  method?: RequestMethod;
  data?: TData;
}

export const httpCall = async <T, TData extends unknown = {}>({
  method = 'POST',
  data = {} as unknown as TData,
  url,
}: IFetch<TData>): Promise<T> => {
  try {
    const res = await fetch(url, {
      method: method, /// no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return (await res.json()) as T;
  } catch (error) {
    return error as T;
  }
};
