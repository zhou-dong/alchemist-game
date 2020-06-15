export interface User {
    id: number;
    name: string;
    avatar: string | null | undefined;
}

export interface UserState {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}
