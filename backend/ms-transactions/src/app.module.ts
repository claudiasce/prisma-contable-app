import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from './common/proxy/proxy.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { MainModule } from './modules/main.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // ScheduleModule.forRoot(),
    ProxyModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_MAIN_HOST,
      port: parseInt(process.env.DB_MAIN_PORT),
      username: process.env.DB_MAIN_USERNAME,
      password: process.env.DB_MAIN_PASSWORD,
      database: process.env.DB_MAIN_DATABASE,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    MainModule,
    ProvidersModule,
  ],
  providers: [],
})
export class AppModule {}
