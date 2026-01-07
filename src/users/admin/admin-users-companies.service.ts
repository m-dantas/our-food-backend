import { Injectable } from '@nestjs/common';
import { CreateUserWithCompanyDTO } from '../dto/create-user-with-company.dto';
import { UsersAdminRepository } from 'src/repositories/users-admin.repository';

@Injectable()
export class AdminUsersCompaniesService {
  constructor(private readonly usersAdminCompanie: UsersAdminRepository) {}

  async createUserWithCompany(body: CreateUserWithCompanyDTO) {
    const bodyUser = {
      name: body.name,
      cellphone: body.cellphone,
      email: body.email,
      active: true,
    };
    const user = await this.usersAdminCompanie.create(bodyUser, body.company);

    return user;
  }

  async getAllUsers() {
    const users = await this.usersAdminCompanie.findMany();
    return users;
  }

  async changeStatus(id: string) {
    const user = await this.usersAdminCompanie.changeStatus(id);
    return user;
  }
}
