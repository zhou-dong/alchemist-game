import { getAuthHeaders } from '../user/userUtils';
import { Pagination } from './pagination';
import { Comment } from './comment';

const commentsUrl = 'https://api.alchemist-ai.com/api/v1/comments';

export const getComments = async (challengeId: number, page: number): Promise<Pagination> => {

    const requestInit: RequestInit = { method: 'GET' };

    return await fetch(`${commentsUrl}/challenges/${challengeId}?page=${page}`, requestInit)
        .then(response => response.json())
        .then(json => json as Pagination);
};

export const deleteComment = async (commentId: number): Promise<boolean> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return false;
    }

    const requestInit: RequestInit = {
        method: 'DELETE',
        headers: authHeaders,
    };

    return await fetch(`${commentsUrl}/${commentId}`, requestInit)
        .then(response => response.json())
        .then(json => json as boolean);
};

export const saveOrUpdateComment = async (comment: Comment): Promise<Comment | null> => {
    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
        return null;
    }

    const requestInit: RequestInit = {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(comment),
    };

    return await fetch(`${commentsUrl}`, requestInit)
        .then(response => response.json())
        .then(json => json as Comment);
};
