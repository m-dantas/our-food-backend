import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from '../dto/signin.dto';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}
  @Post()
  async signIn(@Body() body: SignInDTO) {
    return await this.adminAuthService.authenticate(body);
  }
}
