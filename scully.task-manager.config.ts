import { ScullyConfig } from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'task-manager',
  distFolder: './dist/task-manager/browser',
  outDir: './dist/static',
  defaultPostRenderers: []
};
