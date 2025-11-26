import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    mockLogin(): {
        accessToken: string;
        user: import("./auth.service").AuthUser;
    };
}
