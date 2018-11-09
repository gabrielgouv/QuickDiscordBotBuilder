import { transports, createLogger, format } from 'winston'

export default class Log {

    public static error(message: any) {
        this.logger.error(message)
    }

    public static warn(message: any) {
        this.logger.warn(message)
    }

    public static info(message: any) {
        this.logger.info(message)
    }

    public static verbose(message: any) {
        this.logger.verbose(message)
    }

    public static debug(message: any) {
        this.logger.debug(message)
    }

    public static silly(message: any) {
        this.logger.silly(message)
    }

    private static readonly logger = createLogger({
        format: format.combine(
            format.cli(),
            format.timestamp(),
            format.colorize(),
            format.printf((info) => {
                return `[${new Date(info.timestamp).toUTCString()} | ${info.level}] ${info.message}`;
            }),
        ),
        transports: [
            new transports.Console(),
        ],
    })

}