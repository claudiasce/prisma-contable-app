import * as process from 'node:process';

export function RabbitMQ() {
  return {
    url: process.env.AMQP_URL,
    AuthQueue: process.env.MQ_AUTH_QUEUE,
    ReportQueue: process.env.MQ_REPORT_QUEUE,
    NotificationQueue: process.env.MQ_NOTIFICATION_QUEUE,
    WhatsappOpenQueue: process.env.MQ_WHATSAPP_MS_QUEUE,
    RequirementsQueue: process.env.MQ_REQUIREMENTS_MS_QUEUE,
    InventoryQueue: process.env.MQ_INVENTORY_MS_QUEUE,
  };
}
