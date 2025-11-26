export type AuthUser = {
    id: string;
    email: string;
    name: string;
};
export declare class AuthService {
    mockLogin(): {
        accessToken: string;
        user: AuthUser;
    };
}
