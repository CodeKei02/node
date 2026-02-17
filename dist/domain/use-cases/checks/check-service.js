"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckService = void 0;
const log_entity_1 = require("../../entities/log.entity");
class CheckService {
    logRepository;
    successCallback;
    errorCallback;
    constructor(logRepository, successCallback, errorCallback) {
        this.logRepository = logRepository;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
    }
    async execute(url) {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new log_entity_1.LogEntity(`Service ${url} working`, log_entity_1.LogSeverityLevel.low);
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback();
            return true;
        }
        catch (err) {
            const errorMessage = `${url} is no ok. ${err}`;
            const log = new log_entity_1.LogEntity(errorMessage, log_entity_1.LogSeverityLevel.high);
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(`${errorMessage}`);
            return false;
        }
    }
}
exports.CheckService = CheckService;
//# sourceMappingURL=check-service.js.map