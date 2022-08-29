import { Global, Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from './common.constants';

const pubsub = new RedisPubSub({
  connection: {
    host: '0.0.0.0',
    port: 6379,
    retryStrategy: (times) => {
      return Math.min(times * 50, 2000);
    },
  },
});

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    },
  ],
  exports: [PUB_SUB],
})
export class CommonModule {}
