import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RabbitMQ } from '../constants';

@Injectable()
export class ProviderProxyServices {
  rabbitMQ: any;

  constructor(private readonly config: ConfigService) {
    this.rabbitMQ = RabbitMQ();
  }

  providerProxy(queue?: string): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.config.get('AMQP_URL')],
        queue: this.rabbitMQ[queue || 'TransactionQueue'],
      },
    });
  }
}
