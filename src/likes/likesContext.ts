import { createContext } from 'react';
import { LikesState } from './likesState';

export const LikesContext = createContext<Partial<LikesState>>({});
