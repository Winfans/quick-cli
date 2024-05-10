import { log, isDebug } from '@quick-cli/utils';

const printErrorLog = (e: Error | unknown, type: string) => {
  if (isDebug()) {
    log.error(type, e);
  } else {
    log.error(type, (e as Error)?.message || e);
  }
};

process.on('uncaughtException', (e) => printErrorLog(e, 'error'));

process.on('unhandledRejection', (e) => printErrorLog(e, 'promise'));
