import run, { LogLevels } from '../../src/index';
import { createApp } from './sandboxApp';

run(createApp, LogLevels.INFO);

