import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Temporary mock endpoint to demonstrate module wiring.
  @Get("mock-login")
  mockLogin() {
    return this.authService.mockLogin();
  }
}


