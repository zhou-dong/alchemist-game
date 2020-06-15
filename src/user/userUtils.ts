import { User } from './user';

const userUrl = 'https://api.alchemist-ai.com/api/v1/users';

const localStorageKey = 'token';
const ACCESS_TOKEN = 'access_token';

const getUrlParams = (): URLSearchParams => {
    const search = window.location.search;
    return new URLSearchParams(search);
};

const getUrlParam = (name: string): string | null => {
    return getUrlParams().get(name);
};

const deleteUrlParam = (name: string) => {
    if (getUrlParam(name)) {
        getUrlParams().delete(name);
    }
};

const getAccessToken = (): string | null => {
    const accessToken = getUrlParam(ACCESS_TOKEN);
    if (accessToken) {
        localStorage.setItem(localStorageKey, accessToken);
    }
    return localStorage.getItem(localStorageKey);
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

export const signOut = (): void => {
    localStorage.removeItem(localStorageKey);
    deleteUrlParam(ACCESS_TOKEN);
    window.location.href = window.location.href.split('?')[0];
};

export const getMe = async (): Promise<User | null> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return null;
    }

    const requestInit: RequestInit = {
        method: 'GET',
        headers: authHeaders
    };

    return await fetch(`${userUrl}/me`, requestInit)
        .then(response => response.json())
        .then(json => createUser(json));
};

export const getUser = async (userId: number): Promise<User | null> => {
    const requestInit: RequestInit = { method: 'GET' };
    return await fetch(`${userUrl}/${userId}`, requestInit)
        .then(response => response.json())
        .then(json => createUser(json));
};
