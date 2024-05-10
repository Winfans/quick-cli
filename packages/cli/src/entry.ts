import { createInitCommand } from '@quick-cli/init';
import { createCLI } from './createCLI';
import './exception';

export default function entry() {
  const program = createCLI();
  createInitCommand(program);
  program.parse(process.argv);
}
