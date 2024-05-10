import Command from '@quick-cli/command';
import { Command as Commander } from 'commander';
import { log } from '@quick-cli/utils';
import createTemplate from './createTemplate.js';
import installTemplate from './installTemplate.js';
import downloadTemplate from './downloadTemplate.js';
import { InitCommandOptions } from './type.js';
class InitCommand extends Command {
  get command() {
    return 'init [name]';
  }

  get description() {
    return 'init project';
  }
  get options() {
    return [
      ['-f, --force', '是否强制更新', false],
      // ['-t --type <type>', '项目类型'],
    ];
  }

  async action([name, opts]: [string, InitCommandOptions]) {
    log.verbose('init', name, opts);

    // 选择项目模板，生成项目信息
    const templateInfo = await createTemplate(name, opts);

    // 下载项目模板至缓存目录
    await downloadTemplate(templateInfo);

    // 安装项目模板至项目目录
    await installTemplate(templateInfo, opts);
  }

  preAction() {
    // console.log('pre');
  }

  postAction() {
    // console.log('post');
  }
}

function createInitCommand(instance: Commander) {
  return new InitCommand(instance);
}

export { createInitCommand };
