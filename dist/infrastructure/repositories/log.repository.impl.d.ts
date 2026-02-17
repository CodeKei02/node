import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
export declare class LogRepositoryImpl implements LogRepository {
    private readonly logDatasource;
    constructor(logDatasource: LogDataSource);
    saveLog(log: LogEntity): Promise<void>;
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
//# sourceMappingURL=log.repository.impl.d.ts.map