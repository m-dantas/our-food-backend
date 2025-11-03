import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAdminUsersCompanies } from '../dto/create-admin-users-companies.dto';
import { AdminUsersCompaniesService } from './admin-users-companies.service';

@Controller('admin/users')
export class AdminUsersCompaniesController {
  constructor(
    private readonly usersAdminCompanies: AdminUsersCompaniesService,
  ) {}

  @Get()
  async findAllUsers() {
    return await this.usersAdminCompanies.getAllUsers();
  }

  @Post()
  async create(@Body() body: CreateAdminUsersCompanies) {
    return await this.usersAdminCompanies.createUser(body);
  }

  @Put('/status/:id')
  async changeUserStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersAdminCompanies.changeStatus(id);
  }
}
