/**
 * Application logger - should store data in Kibana or some other log
 */
export class ApplicationLogger {
  public LogInfo(message: string) {
    console.log(message);
  }

  public LogWarn(message: string) {
    console.warn(message);
  }

  public LogError(message: string) {
    console.error(message);
  }
}
