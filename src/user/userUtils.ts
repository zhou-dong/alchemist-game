import { User } from './user';

const getUrlParam = (name: string): string | null => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get(name);
};

export const getAccessToken = (): string | null => {
    const localKey = 'token';
    const accessToken = getUrlParam('access_token');
    if (accessToken) {
        localStorage.setItem(localKey, accessToken);
    }
    return localStorage.getItem(localKey);
};

const userMeUrl = 'https://api.alchemist-ai.com/api/v1/users/me';

const createRequestInit = (accessToken: string): RequestInit => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${accessToken}`);

    const requestInit: RequestInit = {
        method: 'GET',
        headers: headers,
    };
    return requestInit;
};

const createUser = (obj: any): User => ({
    id: obj.id,
    name: (obj.nickname || obj.username),
    avatar: obj.avatar
});

export const getUser = async (): Promise<User | null> => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        return null;
    }

    return await fetch(userMeUrl, createRequestInit(accessToken))
        .then(response => response.json())
        .then(json => createUser(json));
};
