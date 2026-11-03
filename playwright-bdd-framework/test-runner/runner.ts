import { spawnSync } from 'child_process';
import path from 'path';

process.env.TEST_ENV ??= 'qa';

// This runner is a thin wrapper over the Cucumber CLI.
// It loads TypeScript step definitions/hooks and emits a readable HTML report.
const projectRoot = path.resolve(__dirname, '..');
const runnerArgs = [
  'cucumber-js',
  'features/**/*.feature',
  '--require-module', 'ts-node/register',
  '--require', 'step-definitions/**/*.ts',
  '--require', 'hooks/**/*.ts',
  '--format', 'html:reports/cucumber-report.html',
  '--format', 'progress',
  ...process.argv.slice(2)
];

const command = process.platform === 'win32' ? 'cmd.exe' : 'bash';
const commandArgs = process.platform === 'win32'
  ? ['/c', 'npx', ...runnerArgs]
  : ['-lc', `cd "${projectRoot}" && npx ${runnerArgs.join(' ')}`];

const result = spawnSync(command, commandArgs, {
  cwd: projectRoot,
  stdio: 'inherit',
  env: process.env,
  shell: false
});

if (result.error) {
  console.error('Unable to start the Cucumber test runner.');
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 0);
