import { Module } from '@nestjs/common';
import { AwsS3Provider } from '../../common/providers/aws-s3.provider';
import { ClientProxyProvider } from '../../common/proxy.provider';
import { controllers } from './gateway.config';

@Module({
  providers: [ClientProxyProvider, AwsS3Provider],
  controllers: controllers,
})
export class InventoryModule {}
