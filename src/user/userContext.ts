import { createContext } from 'react';
import { UserState } from './user';

export const UserContext = createContext<Partial<UserState>>({});
