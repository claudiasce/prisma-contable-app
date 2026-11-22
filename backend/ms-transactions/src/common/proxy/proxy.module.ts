import { Module } from '@nestjs/common';
import { ProviderProxyServices } from './provider.proxy';

@Module({
  providers: [ProviderProxyServices],
  exports: [ProviderProxyServices],
})
export class ProxyModule {}
