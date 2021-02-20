
export const BASE_URL = 'https://strangers-things.herokuapp.com/api/';
export const COHORT_NAME = '2010-USD-RM-WEB-PT';
export const API_URL = BASE_URL + COHORT_NAME;

export const callApi = async ({ url, method, token, body }) => {
    console.log('callApi: ', { url, method, token, body });
    try {
        const options = {
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('request url: ', API_URL + url);
        console.log('options: ', options);
        const response = await fetch(API_URL + url, options);
        const data = await response.json();
        console.log('data: ', data);
        if (data.error) throw data.error;
        return data;
    } catch (error) {
        console.error('ERROR: ', error);
    }
};