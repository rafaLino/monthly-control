import { queueService } from '@/services/queue.service';
import { AMQPMessage } from '@cloudamqp/amqp-client';
import { useCallback, useEffect, useState } from 'react';

export function useQueue() {
  const [message, setMessage] = useState<AMQPMessage>();
  useEffect(() => {
    queueService.subscribe('version', (message) => {
      setMessage(message);
    });
    return () => {
      queueService.unsubscribe();
    };
  }, []);

  const send = useCallback(async (message: string) => {
    await queueService.send(message);
  }, []);
  return [{ data: message?.bodyString(), ack: message?.ack }, send] as const;
}
