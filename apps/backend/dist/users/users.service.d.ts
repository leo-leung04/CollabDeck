export type User = {
    id: string;
    email: string;
    name: string;
};
export declare class UsersService {
    private readonly mockUser;
    findMe(): User;
}
