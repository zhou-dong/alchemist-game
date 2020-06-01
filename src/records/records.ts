import React from 'react';
import { Record } from './record';

export interface Records {
    records: Record[];
    setRecords: React.Dispatch<React.SetStateAction<any[]>>;
}
