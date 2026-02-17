import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
export declare class FileSystemDatasource implements LogDataSource {
    private readonly logPath;
    private readonly allLogsPath;
    private readonly mediumLogsPath;
    private readonly highLogsPath;
    constructor();
    private createLogsFiles;
    saveLog(newLog: LogEntity): Promise<void>;
    private getLogsFromFile;
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
//# sourceMappingURL=file-system.datasources.d.ts.map