"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDatasource = void 0;
const log_entity_1 = require("../../domain/entities/log.entity");
const fs = require("fs");
class FileSystemDatasource {
    logPath = "logs/logs-low.log";
    allLogsPath = "logs/logs-all.log";
    mediumLogsPath = "logs/logs-medium.log";
    highLogsPath = "logs/logs-high.log";
    constructor() {
        this.createLogsFiles();
    }
    createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath, { recursive: true });
        }
        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach((path) => {
            if (fs.existsSync(path))
                return;
            fs.writeFileSync(path, "");
        });
    };
    async saveLog(newLog) {
        const logAsJson = `${JSON.stringify(newLog)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsJson);
        if (newLog.level === log_entity_1.LogSeverityLevel.low)
            return;
        if (newLog.level === log_entity_1.LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }
        else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }
    getLogsFromFile = (path) => {
        const content = fs.readFileSync(path, "utf-8");
        const logs = content.split("\n").map(log_entity_1.LogEntity.fromJson);
        return logs;
    };
    async getLogs(severityLevel) {
        // switch (severityLevel) {
        //   case LogSeverityLevel.low:
        //     return this.getLogsFromFile(this.logPath);
        //   case LogSeverityLevel.medium:
        //     return this.getLogsFromFile(this.mediumLogsPath);
        //   case LogSeverityLevel.high:
        //     return this.getLogsFromFile(this.highLogsPath);
        //   default: {
        //     throw new Error("Method not implemented.");
        //   }
        // }
        const logPaths = {
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
exports.FileSystemDatasource = FileSystemDatasource;
//# sourceMappingURL=file-system.datasources.js.map