export interface Like {
    id: number;
    userId: number;
    challengeId: number;
    enabled: Boolean;
    createdTime: Date;
    updatedTime: Date | null;
}
