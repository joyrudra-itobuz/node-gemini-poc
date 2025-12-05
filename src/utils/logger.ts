/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';
import { format as formatFns } from 'date-fns';

const timestamp = () => formatFns(new Date(), 'dd-MM-yyyy HH:mm:ss.SSS');
const label = (name: string) => chalk.bold.cyan(`[${name}]`);

function format(...parts: unknown[]) {
  return parts
    .map((p) => {
      if (typeof p === 'string') return p;
      try {
        return JSON.stringify(p);
      } catch {
        return String(p);
      }
    })
    .join(' ');
}

type LogFn = (name: string, ...args: unknown[]) => void;

export const info: LogFn = (name = 'info', ...args) =>
  console.log(chalk.blue(timestamp(), label(name), format(...args)));

export const success: LogFn = (name, ...args) =>
  console.log(chalk.green(timestamp(), label(name), format(...args)));

export const warn: LogFn = (name, ...args) =>
  console.log(chalk.yellow(timestamp(), label(name), format(...args)));

export const error: LogFn = (name, ...args) =>
  console.log(chalk.red(timestamp(), label(name), format(...args)));

export const debug: LogFn = (name, ...args) => {
  if (process.env.DEBUG || process.env.LOG_LEVEL === 'debug') {
    console.log(chalk.bgGreenBright(timestamp(), label(name), format(...args)));
  }
};

export const logger = {
  info,
  success,
  warn,
  error,
  debug,
};

export default logger;
