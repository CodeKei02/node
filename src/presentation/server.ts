import { envs } from "../config/plugins/envs.plugin";
import { MongoLogDatasource } from "../domain/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/logs/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
   new FileSystemDatasource(),
  // new MongoLogDatasource()
);

const emailService = new EmailService()

//todo: mandar el email
    // new SendEmailLogs(
    //   emailService, fileSystemLogRepository
    // ).execute([
    //     'keilinescobarp@gmail.com', 'keicode.dev02@gmail.com'
    //   ])
    // emailService.sendEmailWithFileSystemLogs([
    //   'keilinescobarp@gmail.com', 'keicode.dev02@gmail.com'
    // ])


export class Server {
  public static async Start() {

    console.log("Server started!!...");



    const logs = await logRepository.getLogs(LogSeverityLevel.low);
    console.log(logs)

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";
    //   new CheckService(
    //     logRepository,
    //     undefined,
    //     undefined
    //   ).execute(url);
   
    // });
  }
}
