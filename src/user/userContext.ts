import { createContext } from 'react';
import { User } from './user';

export const UserContext = createContext<User | null>(null);
