import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrawingsModule } from './modules/drawings/drawings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ErrorReportsModule } from './modules/error-reports/error-reports.module';

@Module({
  imports: [DrawingsModule, UsersModule, AuthModule, PermissionsModule, ErrorReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
