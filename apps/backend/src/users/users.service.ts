import { Injectable } from "@nestjs/common";

export type User = {
  id: string;
  email: string;
  name: string;
};

@Injectable()
export class UsersService {
  // Placeholder in-memory user; will be replaced by DB lookup later.
  private readonly mockUser: User = {
    id: "u-1",
    email: "demo@collabdeck.app",
    name: "Demo User"
  };

  findMe(): User {
    return this.mockUser;
  }
}


