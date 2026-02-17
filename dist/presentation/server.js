"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const check_service_1 = require("../domain/use-cases/checks/check-service");
const file_system_datasources_1 = require("../infrastructure/datasources/file-system.datasources");
const log_repository_impl_1 = require("../infrastructure/repositories/log.repository.impl");
const cron_service_1 = require("./cron/cron-service");
const fileSystemLogRepository = new log_repository_impl_1.LogRepositoryImpl(new file_system_datasources_1.FileSystemDatasource());
class Server {
    static Start() {
        console.log("Server started...");
        cron_service_1.CronService.createJob("*/5 * * * * *", () => {
            const url = "http://localhost:3000";
            new check_service_1.CheckService(fileSystemLogRepository, undefined, undefined).execute(url);
            // new CheckService().execute("http://localhost:3000/");
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map