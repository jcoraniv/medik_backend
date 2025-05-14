import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail({}, { message: 'fill with a valid email' })
    @IsNotEmpty({ message: 'email is required' })
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty({ message: 'password is required' })
    @MinLength(6, { message: 'the password must be at least 6 characters' })
    password: string;

    @ApiProperty({ example: 'John' })
    @IsNotEmpty({ message: 'the name is required' })
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    @IsNotEmpty({ message: 'The last name is required' })
    lastName: string;

    @ApiProperty({ enum: UserRole, default: UserRole.PATIENT })
    @IsEnum(UserRole, { message: 'Rol is not valid' })
    @IsOptional()
    role?: UserRole;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}