import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserWithCompanyDTO } from '../dto/create-user-with-company.dto';
import { AdminUsersCompaniesService } from './admin-users-companies.service';
// import { CreateUserToCompanyDTO } from '../dto/create-user-to-company.dto';

@Controller('admin/users')
export class AdminUsersCompaniesController {
  constructor(
    private readonly usersAdminCompanies: AdminUsersCompaniesService,
  ) {}

  @Get()
  async findAllUsers() {
    return await this.usersAdminCompanies.getAllUsers();
  }

  // @Post()
  // async createUserToCompany(@Body() body: CreateUserToCompanyDTO) {
  //   return await this.usersAdminCompanies.createUserToCompany(body);
  // }

  @Post('/with/company')
  async createWithCompany(@Body() body: CreateUserWithCompanyDTO) {
    return await this.usersAdminCompanies.createUserWithCompany(body);
  }

  @Put('/status/:id')
  async changeUserStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersAdminCompanies.changeStatus(id);
  }
}
