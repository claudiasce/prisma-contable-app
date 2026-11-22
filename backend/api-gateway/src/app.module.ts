import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './common/guard/auth.guard';
import { PermissionsGuard } from './common/guard/permissions.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { MulterModule } from '@nestjs/platform-express';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MulterModule.register({
      limits: {
        fileSize: 40 * 1024 * 1024,
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    InventoryModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
