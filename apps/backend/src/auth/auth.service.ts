import { Injectable } from "@nestjs/common";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

@Injectable()
export class AuthService {
  // TODO: replace with real OAuth/JWT logic
  mockLogin(): { accessToken: string; user: AuthUser } {
    return {
      accessToken: "mock-token",
      user: {
        id: "u-1",
        email: "demo@collabdeck.app",
        name: "Demo User"
      }
    };
  }
}


