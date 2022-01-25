import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { USER } from 'src/common/models/models';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags(USER.name)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({summary: 'Creacion de Usuario'})
  create(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Get()
  @ApiOperation({summary: 'Buscar todos los usuarios'})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Buscar un usuario'})
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Modificar Usuario'})
  updateOne(@Param('id') id: string, @Body() userDTO: UserDTO) {
    return this.userService.updateOne(id, userDTO);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Eliminar Usuario'})
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}
