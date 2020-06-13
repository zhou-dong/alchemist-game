import { getAuthHeaders } from '../user/userUtils';
import { Thumb, Thumbs, ThumbType } from './thumbs';

const thumbsUrl = 'https://api.alchemist-ai.com/api/v1/likes/challenges';

export const getThumbs = async (challengeId: number): Promise<Thumbs> => {

    const requestInit: RequestInit = { method: 'GET' };

    return await fetch(`${thumbsUrl}/${challengeId}/count`, requestInit)
        .then(response => response.json())
        .then(json => json as Thumbs);
};

export const sendThumb = async (challengeId: number, thumb: ThumbType): Promise<Thumb | null> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return null;
    }

    const postBody: Thumb = { challengeId, thumb };

    const requestInit: RequestInit = {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(postBody),
    };

    return await fetch(thumbsUrl, requestInit)
        .then(response => response.json())
        .then(json => json as Thumb);
};

export const getThumb = async (challengeId: number): Promise<Thumb> => {

    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return { challengeId, thumb: ThumbType.NONE };
    }

    const requestInit: RequestInit = {
        method: 'GET',
        headers: authHeaders
    };

    return await fetch(`${thumbsUrl}/${challengeId}`, requestInit)
        .then(response => response.json())
        .then(json => json as Thumb);
};
