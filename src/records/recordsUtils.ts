import { getAuthHeaders } from '../user/userUtils';
import { Record } from './record';

const recordsUrl = 'https://api.alchemist-ai.com/api/v1/records/challenges';

export const save = async (challengeId: number): Promise<Record | null> => {
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

    return await fetch(recordsUrl, requestInit)
        .then(response => response.json())
        .then(json => json as Record);
};

export const getRecords = async (): Promise<Record[]> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return [];
    }

    const requestInit: RequestInit = {
        method: 'GET',
        headers: authHeaders
    };

    return await fetch(recordsUrl, requestInit)
        .then(response => response.json())
        .then(json => json as Record[]);
};
