import React from 'react';
import { Like } from './like';

export interface LikesState {
    likes: Like[];
    setLikes: React.Dispatch<React.SetStateAction<any[]>>;
}
