import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
