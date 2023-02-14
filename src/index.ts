import 'dotenv/config';
import debugLib from 'debug';
import express from 'express';
import { AddressInfo } from 'net';

const debug = debugLib('teste');

async function main(): Promise<void> {
  const PORT = process.env.PORT ?? 3000;

  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const server = app.listen(PORT, () => {
    const address = server.address() as AddressInfo;
    debug(`Server running on port ${address.port}`);
  });

  process.on('SIGINT', () => {
    server.close(() => {
      debug('Server closed');
      process.exit();
    });
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      debug('Server closed');
      process.exit();
    });
  });
}

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
