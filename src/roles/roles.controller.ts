import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDTO } from './dto/create-roles.dto';
import { UpdateRolesDTO } from './dto/update-roles.dto';

@Controller('admin/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAllRoles() {
    return await this.rolesService.getAllRoles();
  }

  @Get(':id')
  async findOneRole(@Param('id', ParseUUIDPipe) role_id: string) {
    return await this.rolesService.getFindOneRole(role_id);
  }

  @Post()
  async create(@Body() body: CreateRolesDTO) {
    return await this.rolesService.createRole(body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) role_id: string) {
    return await this.rolesService.deleteRole(role_id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) role_id: string,
    @Body() body: UpdateRolesDTO,
  ) {
    return await this.rolesService.updateRole(role_id, body);
  }
}
