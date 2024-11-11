import fetch from 'node-fetch';
export const httpCall = async ({ method = 'POST', data = {}, url, }) => {
    try {
        const res = await fetch(url, {
            method: method,
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return (await res.json());
    }
    catch (error) {
        return error;
    }
};
//# sourceMappingURL=fetch.js.map