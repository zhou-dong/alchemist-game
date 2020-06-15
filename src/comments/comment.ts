export interface Comment {
    id: number;
    userId: number;
    challengeId: number;
    content: string;
    parentId: number | undefined;
    createdTime: string | null;
}
