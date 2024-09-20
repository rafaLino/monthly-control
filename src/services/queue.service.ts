import env from '@/lib/env';
import { AMQPChannel, AMQPMessage, AMQPQueue, AMQPWebSocketClient } from '@cloudamqp/amqp-client';

export class QueueService {
  private client: AMQPWebSocketClient | undefined;
  private channel: AMQPChannel | undefined;
  private queue: AMQPQueue | undefined;
  private initiated = false;
  private consumerTag: string = '';

  public async init() {
    if (this.initiated) {
      return;
    }
    try {
      this.client = this.getClient();
      const connection = await this.client.connect();
      this.channel = await connection.channel();
      this.initiated = true;
      this.consumerTag = crypto.randomUUID();
    } catch (error) {
      console.warn('connection error: ', error);
      this.reconnect();
    }
  }

  public async send(message: string) {
    if (!this.initiated) {
      await this.init();
    }
    try {
      await this.channel?.basicPublish('amq.fanout', '', message);
    } catch (error) {
      console.warn('publish error: ', error);
      this.reconnect();
    }
  }

  public async subscribe(queueName: string, callback: (message: AMQPMessage) => void) {
    if (!this.initiated) {
      await this.init();
    }
    const queue = await this.getQueue(queueName);
    queue.subscribe({ noAck: false, tag: this.consumerTag }, callback);
  }

  public unsubscribe() {
    return this.queue?.unsubscribe(this.consumerTag);
  }

  private reconnect() {
    this.initiated = false;
    console.info('retrying in 1s...');
    setTimeout(this.init, 1000);
  }

  private async getQueue(queueName: string) {
    if (this.queue) {
      return this.queue;
    }

    this.queue = await this.channel!.queue(queueName);
    return this.queue;
  }

  private getClient() {
    return new AMQPWebSocketClient(env.VITE_AMQP_URL, env.VITE_AMQP_VHOST, env.VITE_AMQP_USER, env.VITE_AMQP_PASSWORD);
  }
}

export const queueService = new QueueService();
