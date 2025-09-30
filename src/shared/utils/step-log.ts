type logType = 'info' | 'success' | 'error';

interface Props {
  entity: string;
  action: string;
  type?: logType;
}

export const logStep = ({ entity, action, type = 'info' }: Props) => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  let color = '\x1b[37m';
  if (type === 'success') color = '\x1b[32m';
  if (type === 'error') color = '\x1b[31m';
  if (type === 'info') color = '\x1b[36m';
  const reset = '\x1b[0m';

  const message = `[${time} - ${entity} - ${action}]`;

  if (type === 'error') {
    console.error(`${color}${message}${reset}`);
  } else {
    console.log(`${color}${message}${reset}`);
  }
};
