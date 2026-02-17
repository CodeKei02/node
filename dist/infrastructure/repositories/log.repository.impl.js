"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogRepositoryImpl = void 0;
class LogRepositoryImpl {
    logDatasource;
    // private logDatasource: LogDataSource
    constructor(logDatasource) {
        this.logDatasource = logDatasource;
    }
    async saveLog(log) {
        return this.logDatasource.saveLog(log);
    }
    async getLogs(severityLevel) {
        return this.logDatasource.getLogs(severityLevel);
    }
}
exports.LogRepositoryImpl = LogRepositoryImpl;
//# sourceMappingURL=log.repository.impl.js.map