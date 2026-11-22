import { Module } from '@nestjs/common';
import { ProxyModule } from '../common/proxy/proxy.module';
import { UtilLib } from '../common/libs/util.lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { controllersArray, providersArray } from './module.config';
import { CatalogEntity } from '../common/entities/catalog.entity';

@Module({
  imports: [ProxyModule, TypeOrmModule.forFeature([CatalogEntity])],
  controllers: controllersArray,
  providers: [UtilLib, ...providersArray],
  exports: [],
})
export class MainModule {}
