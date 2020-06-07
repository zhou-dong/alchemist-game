export interface Like {
    id: number;
    userId: number;
    challengeId: number;
    enabled: boolean;
    createdTime: Date;
    updatedTime: Date | null;
}
