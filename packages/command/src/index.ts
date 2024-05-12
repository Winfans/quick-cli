import { log } from '@quick-cli/utils';
import { Command as Commander } from 'commander';

class Command {
  program: Commander;

  get command(): string {
    throw new Error('command must be implements');
  }

  get description(): string {
    throw new Error('command must be implements');
  }

  get options(): Array<string | boolean>[] {
    return [];
  }

  constructor(instance: Commander) {
    if (!instance) {
      throw new Error('command instance must not be null');
    }

    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description);
    cmd.hook('preAction', () => {
      this.preAction();
    });
    cmd.hook('postAction', () => {
      this.postAction();
    });
    if (this.options?.length) {
      this.options.forEach((option) => {
        cmd.option(...(option as [string, string, boolean]));
      });
    }
    cmd.action((...args) => {
      this.action(args);
    });
  }

  action(args: unknown) {
    log.verbose('action args', JSON.stringify(args));
    throw new Error('action must be implements');
  }

  preAction() {}

  postAction() {}
}

export { Command };
