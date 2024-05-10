import { program } from 'commander';
import { log } from '@quick-cli/utils';
import semver from 'semver';
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'node:path';
import { LOWEST_NODE_VERSION, __dirname } from './constants';

const pkg = fse.readJSONSync(path.resolve(__dirname, '../package.json'));

/**
 * 检查node版本
 */
function checkNodeVersion() {
  log.verbose('node version', process.version);
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(chalk.red`quick 需要安装 ${LOWEST_NODE_VERSION}以上版本的Node.js`);
  }
}

function preAction() {
  checkNodeVersion();
}

export function createCLI() {
  log.info('version', pkg.version);
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', preAction);

  program.on('option:debug', () => {
    if (program.opts().debug) {
      log.verbose('', 'debug 模式启动');
    }
  });

  program.on('command:*', (obj) => {
    log.error('', `未知的命令：${obj[0]}`);
  });

  return program;
}
