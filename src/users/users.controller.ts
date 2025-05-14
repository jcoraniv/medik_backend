import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ClassSerializerInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'create new user' })
    @ApiResponse({ status: 201, description: 'user created successfully', type: User })
    @ApiResponse({ status: 400, description: 'invalid fields' })
    @ApiResponse({ status: 409, description: 'email already days' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'get all users', type: [User] })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'get a user by id' })
    @ApiResponse({ status: 200, description: 'user got successfully', type: User })
    @ApiResponse({ status: 404, description: 'user not found' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'update a user by id' })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
    @ApiResponse({ status: 400, description: 'Invalid fields' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 409, description: 'the emails already exists' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiResponse({ status: 200, description: 'deleted user by id' })
    @ApiResponse({ status: 404, description: 'user not found' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}