import { MuzikaLoggerUtils } from './logger.util';
import { MuzikaLoggerLevel } from './logger.level';

export const Levels = [
  'TRACE',
  'DEBUG',
  'INFO',
  'LOG',
  'WARN',
  'ERROR',
  'OFF'
];

export class MuzikaConsole {
  public static chalk: any;
  constructor(private accessLevel: MuzikaLoggerLevel) {
  }

  public static _log(level: MuzikaLoggerLevel, message, additional: any[] = []): void {
    if (!message) {
      return;
    }

    const logLevelString = Levels[level];

    message = MuzikaLoggerUtils.prepareMessage(message);

    const timestamp = new Date().toISOString();

    const callerDetails = MuzikaLoggerUtils.getCallerDetails();

    // if no message or the log level is less than the environ
    if (level < MuzikaLoggerLevel.LOG) {
      return;
    }

    const metaString = MuzikaLoggerUtils.prepareMetaString(timestamp, logLevelString, callerDetails.fileName, callerDetails.lineNumber);

    if (MuzikaConsole._isElectronBrowser()) {
      const color = MuzikaLoggerUtils.getChalkColor(MuzikaConsole.chalk, level);
      this.log(color(metaString, message), ...(additional || []));
    } else {
      const color = MuzikaLoggerUtils.getColor(level);
      this.log(`%c${metaString}`, `color:${color}`, message, ...(additional || []));
    }
  }

  public static _isElectronBrowser() {
    return process && (process as any).type === 'browser';
  }

  public static trace(message, ...additional: any[]): void {
    MuzikaConsole._log.apply(console, [MuzikaLoggerLevel.TRACE, message, additional]);
  }

  public static debug(message, ...additional: any[]): void {
    MuzikaConsole._log.apply(console, [MuzikaLoggerLevel.DEBUG, message, additional]);
  }

  public static info(message, ...additional: any[]): void {
    MuzikaConsole._log.apply(console, [MuzikaLoggerLevel.INFO, message, additional]);
  }

  public static log(message, ...additional: any[]): void {
    MuzikaConsole._log.apply(console, [MuzikaLoggerLevel.LOG, message, additional]);
  }

  public static warn(message, ...additional: any[]): void {
    MuzikaConsole._log.apply(console, [MuzikaLoggerLevel.WARN, message, additional]);
  }

  public static error(message, ...additional: any[]): void {
    MuzikaConsole._log.apply(console, [MuzikaLoggerLevel.ERROR, message, additional]);
  }
}
