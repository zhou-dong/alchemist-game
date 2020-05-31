import { Record } from './record';

export const getRecords = async (): Promise<Record[]> => {
    const r1: Record = {
        challengeId: 1,
        isSuccess: true,
        createdTime: new Date()
    };
    const r2: Record = {
        challengeId: 2,
        isSuccess: true,
        createdTime: new Date()
    };
    const r3: Record = {
        challengeId: 3,
        isSuccess: true,
        createdTime: new Date()
    };
    const r9: Record = {
        challengeId: 9,
        isSuccess: true,
        createdTime: new Date()
    };
    return [r1, r2, r3, r9];
};
