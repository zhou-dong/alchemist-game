export interface Thumbs {
    ups: number;
    downs: number;
}

export enum ThumbType {
    DOWN = 0, UP = 1, NONE = 2
}

export interface Thumb {
    challengeId: number;
    thumb: ThumbType;
}
