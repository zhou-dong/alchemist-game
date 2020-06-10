import { getAuthHeaders } from '../user/userUtils';
import { Like } from './like';

const likesUrl = 'https://api.alchemist-ai.com/api/v1/favorites/challenges';

export const getLikes = async (): Promise<Like[]> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return [];
    }

    const requestInit: RequestInit = {
        method: 'GET',
        headers: authHeaders
    };

    return await fetch(likesUrl, requestInit)
        .then(response => response.json())
        .then(json => json as Like[]);
};

export const save = async (challengeId: number): Promise<any> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return null;
    }

    const postBody = { challengeId: challengeId };

    const requestInit: RequestInit = {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(postBody),
    };

    return await fetch(likesUrl, requestInit).then(response => response.json());
};

export const update = async (like: Like): Promise<any> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return null;
    }

    const requestInit: RequestInit = {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(like),
    };

    return await fetch(likesUrl, requestInit)
        .then(response => response.json());
};
