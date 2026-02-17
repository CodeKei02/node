import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const fs = require("fs");

export class FileSystemDatasource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      },
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) return;

    newLog.level === LogSeverityLevel.medium 
    ? fs.appendFileSync(this.mediumLogsPath, logAsJson)
    : fs.appendFileSync(this.highLogsPath, logAsJson);
    
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");

    if (content.trim() === '') {
      const log = new LogEntity({
        message: `El archivo ${path} se encuentra vacío.`,
        level: LogSeverityLevel.high,
        createdAt: new Date(),
        origin: 'file-system.datasources.ts',
      });
      return [log];
    }
    
    const logs = content.trim().split("\n").map((LogEntity.fromObject));
    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const logPaths: Record<LogSeverityLevel, string> = {
      low: this.allLogsPath,
      medium: this.mediumLogsPath,
      high: this.highLogsPath,
    };

    const path = logPaths[severityLevel];

    if (path === undefined)
      throw new Error(`${severityLevel} is not implemented`);

    return this.getLogsFromFile(path);
  }
}
