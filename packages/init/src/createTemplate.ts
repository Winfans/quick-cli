import { log, makeInput, makeList } from '@quick-cli/utils';
import { homedir } from 'node:os';
import path from 'node:path';
import { TEMPLATES, TEMP_HOME } from './constant';
import { InitCommandOptions, TemplateInfo } from './type';

function getProjectName() {
  return makeInput({
    message: '请输入项目名称',
    defaultValue: 'quick-project',
  });
}

function getTemplate() {
  return makeList({
    choices: TEMPLATES,
    message: '请选择项目模板',
  });
}

function makeTargetPath(template: string) {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, template);
}

const createTemplate = async (name: string, options: InitCommandOptions): Promise<TemplateInfo> => {
  const { template } = options;

  // let addType;
  // if (type) {
  //   addType = type;
  // } else {
  //   // 获取创建类型
  //   addType = await getCreateType();
  // }
  // log.verbose('创建类型', addType);
  // if (addType === TYPE_PROJECT) {
  let addName: string;
  let addTemplate: string;

  if (name) {
    addName = name;
  } else {
    addName = await getProjectName();
  }
  log.verbose('项目名称', addName);

  if (template) {
    addTemplate = template;
  } else {
    addTemplate = await getTemplate();
  }
  log.verbose('项目模板', addTemplate);

  const selectedTemplate = TEMPLATES.find((item) => item.name === addTemplate);
  log.verbose('选中的项目模板', selectedTemplate);

  if (!selectedTemplate) {
    log.error('没有对应的项目模板', '');
    return;
  }

  // const latestVersion = await getLatestVersion(selectedTemplate.npmName);
  // log.verbose('latestVersion', latestVersion);
  // selectedTemplate.version = latestVersion;

  const targetPath = makeTargetPath(selectedTemplate.npmName);
  log.verbose('targetPath', targetPath);

  return {
    // type: addType,
    projectName: addName,
    template: selectedTemplate,
    targetPath,
  };
  // }
};

export default createTemplate;
