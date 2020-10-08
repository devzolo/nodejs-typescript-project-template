import debugLib from 'debug';

const debug = debugLib('teste');

async function main(): Promise<void> {
  const str = 'Hello World!';
  debug(str);

  if (process.env.NODE_ENV === 'development') {
    await new Promise(() => 0);
  }
}

function panic(error: unknown): Promise<void> {
  console.error(error);
  process.exit(1);
}

const exec = main().catch(panic);

if (process.env.NODE_ENV === 'development') {
  exec.finally(
    clearInterval.bind(
      null,
      setInterval(a => a, 1e9),
    ),
  );
}
