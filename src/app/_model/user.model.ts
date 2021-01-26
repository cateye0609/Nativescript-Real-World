export interface User {
    id: string;
    email: string;
    createAt: string;
    updateAt?: string;
    username: string;
    bio?: string;
    image?: string;
    token: string;
}