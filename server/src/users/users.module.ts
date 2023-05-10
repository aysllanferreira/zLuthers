import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthConfig } from '../auth/auth.config';
import { AdminGuard } from './AdminGuard';

@Module({
  providers: [UsersService, AuthConfig, AdminGuard],
  controllers: [UsersController],
})
export class UsersModule {}
