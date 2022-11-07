import logger, { LogLevels } from './log';

export default function run(createApp, logLevel = LogLevels.LOG) {
    logger.setLevel(logLevel);

    logger.info('Crearing App');
    const app = createApp();
    
    logger.info('App starts');
    app.run();

    logger.info('App terminated');
}
