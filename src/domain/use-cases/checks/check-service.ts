import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

const response = (message: string, level: LogSeverityLevel) => {
  return {
    message: message,
    level: level,
    origin: 'check-service.ts'
  }
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) { }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity(response(`Service ${url} working`, LogSeverityLevel.low));
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (err) {
      const errorMessage = `${url} is no ok. ${err}`;
      const log = new LogEntity(response(`Service ${err} is not working`, LogSeverityLevel.high));
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(`${errorMessage}`);
      return false;
    }
  }
}
