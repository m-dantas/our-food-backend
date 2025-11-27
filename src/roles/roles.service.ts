import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesRepository } from 'src/repositories/roles.repository';
import { CreateRolesDTO } from './dto/create-roles.dto';
import { UpdateRolesDTO } from './dto/update-roles.dto';

@Injectable()
export class RolesService {
  constructor(private readonly repository: RolesRepository) {}

  async getAllRoles() {
    try {
      const roles = await this.repository.findMany();
      return roles;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to list all roles',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getFindOneRole(role_id: string) {
    try {
      const role = await this.repository.findFirst(role_id);
      return role;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to list a single role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createRole(bodyRole: CreateRolesDTO) {
    try {
      await this.repository.create(bodyRole);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create a role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteRole(role_id: string) {
    try {
      await this.repository.delete(role_id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to delete a role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateRole(role_id: string, bodyRole: UpdateRolesDTO) {
    try {
      await this.repository.update(role_id, bodyRole);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update a role',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
