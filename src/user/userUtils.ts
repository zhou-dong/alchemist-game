import { User } from './user';

const userMeUrl = 'https://api.alchemist-ai.com/api/v1/users/me';

const getUrlParam = (name: string): string | null => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get(name);
};

const getAccessToken = (): string | null => {
    const localKey = 'token';
    const accessToken = getUrlParam('access_token');
    if (accessToken) {
        localStorage.setItem(localKey, accessToken);
    }
    return localStorage.getItem(localKey);
};

const createAuthHeaders = (accessToken: string): Headers => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
};

export const getAuthHeaders = (): Headers | null => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        return null;
    }
    return createAuthHeaders(accessToken);
};

const createUser = (obj: any): User => ({
    id: obj.id,
    name: (obj.nickname || obj.username),
    avatar: obj.avatar
});

export const getUser = async (): Promise<User | null> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return null;
    }

    const requestInit: RequestInit = {
        method: 'GET',
        headers: authHeaders
    };

    return await fetch(userMeUrl, requestInit)
        .then(response => response.json())
        .then(json => createUser(json));
};
