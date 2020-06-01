import { createContext } from 'react';
import { Records } from './records';

export const RecordsContext = createContext<Partial<Records>>({});
